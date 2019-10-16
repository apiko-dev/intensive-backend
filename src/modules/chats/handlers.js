import sockets from 'services/sockets';
import { getObjectBySchema } from 'common/helpers';
import * as schemas from './schemas';
import * as constants from './constants';

export function onMessageCreated(message) {
  try {
    sockets.sendMessage(
      message.participants,
      getObjectBySchema(schemas.messageWithActionType, {
        type: constants.messageActions.ADD,
        message,
      }),
    );
  } catch (error) {
    // do nothing
  }
}

export function onChatCreated(chat) {
  const usersToSend = chat.participantsIds.filter((id) => id !== chat.owner_id);

  try {
    sockets.sendEvent(
      usersToSend,
      getObjectBySchema(schemas.chatWithEventType, {
        type: constants.messageActions.CREATED_CHAT,
        chat,
      }),
    );
  } catch (error) {
    // do nothing
  }
}
