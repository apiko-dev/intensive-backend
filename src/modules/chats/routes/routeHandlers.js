import { checkConstraints } from 'modules/common/helpers';
import errorCodes from 'constants/errorCodes';
import * as db from '../db';
import * as handlers from '../handlers';

export async function getChats(req, res) {
  const { userId } = req.user;

  const chats = await db.getChats(userId);
  res.send(chats);
}

export async function createChat(req, res) {
  const { userId } = req.user;
  const { id } = req.params;
  const { message } = req.body;

  try {
    const chatWithMessage = await db.createChat({
      productId: id,
      userId,
      message,
    });

    if (!chatWithMessage) {
      res.status(409).send({ error: errorCodes.CANNOT_CREATE_CHAT });
      return;
    }

    res.send(chatWithMessage);

    handlers.onChatCreated(chatWithMessage);
  } catch (error) {
    if (!error.constraint) throw error;

    const matched = checkConstraints(error.constraint);
    if (matched.NOT_FOUND_CHAT_OWNER) {
      res.status(403).send({ error: errorCodes.UNAUTHORIZED });
      return;
    }

    if (matched.CHAT_ALREADY_CREATED) {
      res.status(409).send({ error: matched.CHAT_ALREADY_CREATED });
      return;
    }

    if (error.NOT_FOUND_CHAT_PRODUCT) {
      res.status(404).send({ error: errorCodes.NOT_FOUND });
      return;
    }

    throw error;
  }
}

export async function createMessage(req, res) {
  const { id } = req.params;
  const { userId } = req.user;
  const { message } = req.body;

  try {
    const createdMessage = await db.createMessage({ id, userId, message });

    if (!createdMessage) {
      res.status(409).send({ error: errorCodes.CANNOT_CREATE_MESSAGE });
      return;
    }

    res.send(createdMessage);

    handlers.onMessageCreated(createdMessage);
  } catch (error) {
    if (!error.constraint) throw error;

    const matched = checkConstraints(error.constraint);
    if (matched.NOT_FOUND_MESSAGE_OWNER) {
      res.status(403).send({ error: errorCodes.UNAUTHORIZED });
      return;
    }

    if (matched.NOT_FOUND_MESSAGE_CHAT) {
      res.status(404).send({ error: errorCodes.NOT_FOUND });
      return;
    }

    throw error;
  }
}

export async function getMessages(req, res) {
  const { userId } = req.user;
  const { id } = req.params;
  const { limit, from } = req.query;

  const messages = await db.getMessages({ userId, id, limit, from });
  res.send(messages);
}
