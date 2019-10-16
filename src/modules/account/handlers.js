import * as userDb from 'users/db';
import errorCodes from 'constants/errorCodes';

export async function getAccount(req, res) {
  const { userId } = req.user;

  const user = await userDb.getUser(userId);

  if (!user) {
    res.status(404).send({ error: errorCodes.NOT_FOUND });
    return;
  }

  res.send(user);
}

export async function updateAccount(req, res) {
  const { userId } = req.user;
  const { avatar, fullName, phone, location } = req.body;

  const updatedUser = await userDb.updateUser({
    userId,
    fullName,
    avatar,
    phone,
    location,
  });

  if (!updatedUser) {
    res.status(404).send({ error: errorCodes.NOT_FOUND });
    return;
  }

  res.send(updatedUser);
}
