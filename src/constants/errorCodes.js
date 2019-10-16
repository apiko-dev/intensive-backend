import mirror from 'utils/mirrorKeys';

const constraints = {
  EMAIL_NOT_VALID: 'email_regex',
  EMAIL_EMPTY: 'email_not_blank',
  EMAIL_TOO_LONG: 'email_too_long',
  EMAIL_ALREADY_USED: 'user_email_unique',

  UNSUPPORTED_HASH_FUNC: 'password_hash_func',

  PHONE_EMPTY: 'phone_not_blank',
  PHONE_TOO_LONG: 'phone_too_long',

  NOT_FOUND_PRODUCT_OWNER: 'product_owner_fk',

  PRODUCT_ALREADY_SAVED: 'saved_products_unique',
  NOT_FOUND_SAVED_PRODUCT: 'saved_products_product_fk',
  NOT_FOUND_SAVED_PRODUCT_OWNER: 'saved_products_owner_fk',

  NOT_FOUND_CHAT_OWNER: 'chat_owner_fk',
  CHAT_ALREADY_CREATED: 'chat_unique',
  NOT_FOUND_CHAT_PRODUCT: 'chat_product_fk',

  NOT_FOUND_MESSAGE_OWNER: 'message_owner_fk',
  NOT_FOUND_MESSAGE_CHAT: 'message_chat_fk',
};

const errors = mirror([
  'NOT_FOUND',

  'UNAUTHORIZED',

  'WRONG_PASSWORD',
  'UNAUTHORIZED',

  'CANNOT_CREATE_CHAT',
  'CANNOT_CREATE_MESSAGE',

  'UPLOAD_FAILED',
  'NO_IMAGE_FIELD',
  'INVALID_MEDIA_FORMAT',

  'CANNOT_SAVE_PRODUCT',
]);

export default {
  ...constraints,
  ...errors,
};
