import { get, getList, sql, ifDef } from 'services/database';
import { match } from 'utils';

export function getProductSavedState(paramName) {
  return sql`

    EXISTS(
      SELECT * FROM products.saved_products AS s
      WHERE s.product_id = p.id
        AND s.owner_id = ${paramName}
    ) AS saved,

  `;
}

export function createProduct({
  userId,
  title,
  description = null,
  photos = null,
  location,
  price,
}) {
  const { query, params } = sql`

    INSERT INTO
      products.products(owner_id, title, description, photos, location, price)
    VALUES (
      ${userId},
      ${title}::TEXT,
      ${description}::TEXT,
      ${photos}::TEXT[],
      ${location}::TEXT,
      ${price}
    )
    RETURNING *;

  `.create();

  return get(query, params);
}

export function getLatestProducts({ userId, limit, from }) {
  const { query, params } = sql`

    SELECT
      ${ifDef(userId, getProductSavedState(userId))}
      p.*
    FROM views.products AS p
    ${ifDef(from, sql`WHERE p.id < ${from}`)}
    ORDER BY p.id DESC
    FETCH FIRST ${limit} ROWS ONLY;

  `.create();

  return getList(query, params);
}

export function getProductById({ id }) {
  const { query, params } = sql`

    SELECT *
    FROM views.products_with_owner AS product
    WHERE product.id = ${id};

  `.create();

  return get(query, params);
}

export function getProductWithChat({ id, userId }) {
  const { query, params } = sql`

    SELECT
      ${getProductSavedState(userId)}
      p.*,
      c.id AS chat_id
    FROM views.products_with_owner AS p
      LEFT JOIN chat.chats AS c
        ON (c.product_id = p.id AND c.owner_id = ${userId})
    WHERE p.id = ${id};

  `.create();

  return get(query, params);
}

export function saveProduct({ id, userId }) {
  const { query, params } = sql`

    INSERT INTO
      products.saved_products(product_id, owner_id)
    SELECT ${id}, ${userId}
    FROM products.products AS p
    WHERE p.id = ${id}
      AND NOT p.owner_id = ${userId}
    RETURNING *;

  `.create();

  return get(query, params);
}

export function unSaveProduct({ id, userId }) {
  const { query, params } = sql`

    DELETE FROM products.saved_products
    WHERE product_id = ${id}
      AND owner_id = ${userId}
    RETURNING *;

  `.create();

  return get(query, params);
}

export function getSavedProducts({ userId, limit, from }) {
  const { query, params } = sql`

    SELECT
      p.*,
      TRUE as saved
    FROM products.saved_products AS s
      LEFT JOIN views.products AS p ON (s.product_id = p.id)
    WHERE s.owner_id = ${userId}
      ${ifDef(from, sql`AND s.id < ${from}`)}
    ORDER BY s.id DESC
    FETCH FIRST ${limit} ROWS ONLY;

  `.create();

  return getList(query, params);
}

export function saveMultipleProducts({ userId, ids }) {
  const { query, params } = sql`

    INSERT INTO
      products.saved_products(product_id, owner_id)
    SELECT p.id, ${userId}
    FROM UNNEST(${ids}::INT[]) AS ids
      JOIN products.products AS p ON (p.id = ids)
    WHERE NOT p.owner_id = ${userId}
    RETURNING *;

  `.create();

  return getList(query, params);
}

export function getProductsByIds({ userId, ids }) {
  const { query, params } = sql`

    SELECT
      ${ifDef(userId, getProductSavedState(userId))}
      p.*
    FROM views.products AS p
      WHERE p.id = ANY(${ids}::INT[])
    ORDER BY p.id DESC;

  `.create();

  return getList(query, params);
}

export function searchProducts({
  userId,
  keywords,
  location,
  priceFrom,
  priceTo,
  limit,
  offset,
}) {
  const keywordsDist = sql`${keywords} <<-> p.keywords AS k_dist,`;
  const locationDist = sql`${location} <<-> p.location AS l_dist,`;
  const priceBigger = sql`AND p.price >= ${priceFrom}`;
  const priceLower = sql`AND p.price <= ${priceTo}`;

  const findBy = match(
    sql`${keywords} <% p.keywords`,
    [
      location && keywords,
      sql`${location} <% p.location AND ${keywords} <% p.keywords`,
    ],
    [location, sql`${location} <% p.location`],
  );

  const orderBy = match(
    '',
    [keywords && location, sql`l_dist, k_dist`],
    [location, sql`l_dist`],
    [keywords, sql`k_dist`],
  );

  const { query, params } = sql`

    SELECT
      ${ifDef(userId, getProductSavedState(userId))}
      ${ifDef(keywords, keywordsDist)}
      ${ifDef(location, locationDist)}
      p.*
    FROM views.products_with_keywords as p
    WHERE
      ${findBy}
      ${ifDef(priceFrom, priceBigger)}
      ${ifDef(priceTo, priceLower)}
    ORDER BY
      ${orderBy}
    OFFSET ${offset}
    FETCH FIRST ${limit} ROWS ONLY;

  `.create();

  return getList(query, params);
}
