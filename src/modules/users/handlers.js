import errorCodes from 'constants/errorCodes';
import * as db from './db';

export async function getUserProducts(req, res) {
  const { id } = req.params;
  const sessionUserId = req.user?.userId;

  const products = await db.getUserProducts({ id, sessionUserId });
  const count = products?.length ?? 0;

  res.send({ count, list: products });
}

export async function getUser(req, res) {
  const { id } = req.params;

  const user = await db.getUser(id);

  if (!user) {
    res.status(404).send({ error: errorCodes.NOT_FOUND });
    return;
  }

  res.send(user);
}
