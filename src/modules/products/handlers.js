import errorCodes from 'constants/errorCodes';
import { checkConstraints } from 'common/helpers';
import { success } from 'common/responses';
import * as db from './db';

export async function createProduct(req, res) {
  const { userId } = req.user;
  const { title, description, photos, location, price } = req.body;

  try {
    const product = await db.createProduct({
      userId,
      title,
      description,
      photos,
      location,
      price,
    });

    res.send(product);
  } catch (error) {
    if (!error.constraint) throw error;

    const matched = checkConstraints(error.constraint);
    if (matched.NOT_FOUND_PRODUCT_OWNER) {
      res.status(403).send({ error: errorCodes.UNAUTHORIZED });
      return;
    }

    throw error;
  }
}

export async function getLatestProducts(req, res) {
  const userId = req.user?.userId;
  const { limit, from } = req.query;

  const products = await db.getLatestProducts({ userId, limit, from });
  res.send(products);
}

export async function getProductById(req, res) {
  const { id } = req.params;
  const userId = req.user?.userId;

  const getProduct = userId ? db.getProductWithChat : db.getProductById;

  const product = await getProduct({ id, userId });

  if (!product) {
    res.status(404).send({ error: errorCodes.NOT_FOUND });
    return;
  }

  res.send(product);
}

export async function saveProduct(req, res) {
  const { id } = req.params;
  const { userId } = req.user;

  try {
    const saved = await db.saveProduct({ id, userId });

    if (!saved) {
      res.status(409).send({ error: errorCodes.CANNOT_SAVE_PRODUCT });
      return;
    }

    res.send(success);
  } catch (error) {
    if (!error.constraint) throw error;

    const matched = checkConstraints(error.constraint);
    if (matched.PRODUCT_ALREADY_SAVED) {
      res.status(409).send({ error: matched.PRODUCT_ALREADY_SAVED });
      return;
    }

    if (matched.NOT_FOUND_SAVED_PRODUCT) {
      res.status(404).send({ error: errorCodes.NOT_FOUND });
      return;
    }

    if (matched.NOT_FOUND_SAVED_PRODUCT_OWNER) {
      res.status(403).send({ error: errorCodes.UNAUTHORIZED });
      return;
    }

    throw error;
  }
}

export async function unSaveProduct(req, res) {
  const { id } = req.params;
  const { userId } = req.user;

  const result = await db.unSaveProduct({ id, userId });

  if (!result) {
    res.status(404).send({ error: errorCodes.NOT_FOUND });
    return;
  }

  res.send(success);
}

export async function getSavedProducts(req, res) {
  const { userId } = req.user;
  const { limit, from } = req.query;

  const products = await db.getSavedProducts({ userId, limit, from });

  res.send(products);
}

export async function saveMultipleProducts(req, res) {
  const { userId } = req.user;
  const { ids } = req.body;

  const saved = await db.saveMultipleProducts({ userId, ids });

  res.send(saved.map((i) => i.productId));
}

export async function getProductsByIds(req, res) {
  const userId = req.user?.userId;
  const { id: ids } = req.query;

  const products = await db.getProductsByIds({ userId, ids });

  res.send(products);
}

export async function searchProducts(req, res) {
  const userId = req.user?.userId;
  const { keywords, location, priceFrom, priceTo, limit, offset } = req.query;

  if (!keywords && !location) {
    res.status(400).send({
      error: 'required at least one of the properties "keywords" or "location"',
    });
    return;
  }

  const products = await db.searchProducts({
    userId,
    keywords,
    location,
    priceFrom,
    priceTo,
    limit,
    offset,
  });

  res.send(products);
}
