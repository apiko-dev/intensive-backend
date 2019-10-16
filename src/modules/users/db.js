import * as productDb from 'products/db';
import { get, getList, sql, ifDef } from 'services/database';

export function getUserProducts({ id, sessionUserId }) {
  const { query, params } = sql`

    SELECT
      ${ifDef(sessionUserId, productDb.getProductSavedState(sessionUserId))}
      p.*
    FROM views.products AS p
    WHERE p.owner_id = ${id}
    ORDER BY p.id DESC;

  `.create();

  return getList(query, params);
}

export function createUser({ email, fullName, passwordHash, hashFunc }) {
  const { query, params } = sql`

    INSERT INTO
      users.users (email, full_name, password_hash, password_hash_type)
    VALUES (${email}::TEXT, ${fullName}::TEXT, ${passwordHash}, ${hashFunc})
    RETURNING *;

  `.create();

  return get(query, params);
}

export function getUser(userId) {
  const { query, params } = sql`

    SELECT *
    FROM views.users
    WHERE id = ${userId};

  `.create();

  return get(query, params);
}

export function getUserByEmail(email) {
  const { query, params } = sql`

    SELECT *
    FROM views.users
    WHERE email = ${email};

  `.create();

  return get(query, params);
}

export function updateUser({ userId, fullName, avatar, phone, location }) {
  const { query, params } = sql`

    UPDATE users.users
    SET
      full_name = ${fullName}::TEXT,
      avatar = ${avatar}::TEXT,
      phone = ${phone}::TEXT,
      location = ${location}::TEXT,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${userId}::INT
    RETURNING *;

  `.create();

  return get(query, params);
}
