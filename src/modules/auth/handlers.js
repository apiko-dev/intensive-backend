import * as userDb from 'users/db';
import passwords from 'services/passwords';
import config from 'config';
import { checkConstraints } from 'common/helpers';
import errorCodes from 'constants/errorCodes';

export async function register(req, res) {
  const { password, fullName, email } = req.body;
  const hashFunc = config.hash.default;

  try {
    const passwordHash = await passwords.hash(hashFunc, password);

    const newUser = await userDb.createUser({
      email,
      fullName,
      passwordHash,
      hashFunc,
    });

    const token = this.jwt.sign({
      userId: newUser.id,
      iat: Date.now(),
    });

    res.send({ token, user: newUser });
  } catch (error) {
    if (!error.constraint) throw error;

    const matched = checkConstraints(error.constraint);
    if (matched.EMAIL_NOT_VALID) {
      res.status(400).send({ error: matched.EMAIL_NOT_VALID });
      return;
    }
    if (matched.EMAIL_ALREADY_USED) {
      res.status(409).send({ error: matched.EMAIL_ALREADY_USED });
      return;
    }

    throw error;
  }
}

export async function login(req, res) {
  const { password, email } = req.body;

  const user = await userDb.getUserByEmail(email);

  if (!user) {
    res.status(404).send({ error: errorCodes.NOT_FOUND });
    return;
  }

  const passwordMatches = await passwords.compare(
    user.passwordHashType,
    password,
    user.passwordHash.toString('utf-8'),
  );

  if (!passwordMatches) {
    res.status(401).send({ error: errorCodes.WRONG_PASSWORD });
    return;
  }

  const token = this.jwt.sign({
    userId: user.id,
    iat: Date.now(),
  });

  res.send({ token, user });
}
