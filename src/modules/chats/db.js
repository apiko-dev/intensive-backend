import * as productDb from 'products/db';
import { get, getList, sql, ifDef } from 'services/database';

export function createMessage({ id, userId, message }) {
  const { query, params } = sql`

    WITH insert_data as (
      INSERT INTO chat.messages(chat_id, owner_id, text)
      SELECT
        ${id},
        ${userId},
        ${message}
      FROM chat.chats AS c
      WHERE c.id = ${id}
        AND ${userId} = ANY(c.participants)
      RETURNING *
    )
    SELECT i.*, array_remove(c.participants, ${userId}) AS participants
    FROM insert_data as i
      LEFT JOIN chat.chats AS c ON (c.id = i.chat_id);

  `.create();

  return get(query, params);
}

export function getMessages({ userId, id, limit, from }) {
  const { query, params } = sql`

    SELECT m.*
    FROM chat.chats AS c
      JOIN views.messages AS m ON (m.chat_id = c.id)
    WHERE c.id = ${id}
      AND ${userId} = ANY(c.participants)
      ${ifDef(from, sql`AND m.id < ${from}`)}
    ORDER BY m.id DESC
    FETCH FIRST ${limit} ROWS ONLY;

  `.create();

  return getList(query, params);
}

export function createChat({ productId, userId, message }) {
  const { query, params } = sql`

    WITH create_chat AS (
      INSERT INTO chat.chats(product_id, owner_id, participants)
      SELECT
        ${productId}::INT,
        ${userId}::INT,
        ARRAY[p.owner_id, ${userId}] as participants
      FROM products.products AS p
      WHERE p.id = ${productId}::INT
        AND NOT p.owner_id = ${userId}::INT
      RETURNING *
    ), create_message AS (
      INSERT INTO chat.messages(chat_id, owner_id, text)
      SELECT
        c.id,
        c.owner_id,
        ${message}
      FROM create_chat AS c
      RETURNING *
    )
    SELECT
      c.*,
      row_to_json(m) AS message,
      row_to_json(product) AS product,
      c.participants AS participantsIds,
      users.participants AS participants
    FROM create_chat AS c
      LEFT JOIN create_message AS m ON TRUE
      ${getJoinChatEntities({ userId })};

  `.create();

  return get(query, params);
}

export function getChats(userId) {
  const { query, params } = sql`

    SELECT
      c.*,
      row_to_json(product) AS product,
      c.participants AS participantsIds,
      users.participants AS participants
    FROM views.chats_with_last_message AS c
      ${getJoinChatEntities({ userId })}
    WHERE
      ARRAY[${userId}::INT] <@ c.participants
    ORDER BY c.message_created_at DESC;

  `.create();

  return getList(query, params);
}

function getJoinChatEntities({ userId }) {
  return sql`

    LEFT JOIN lateral (
      SELECT
        ${productDb.getProductSavedState(userId)}
        p.*
      FROM views.products AS p
      WHERE p.id = c.product_id
    ) AS product ON TRUE
    LEFT JOIN lateral (
      SELECT
        json_agg(u) AS participants
      FROM views.users AS u
      WHERE
        array_remove(c.participants, ${userId}) @> ARRAY[u.id]
    ) AS users ON TRUE

  `;
}
