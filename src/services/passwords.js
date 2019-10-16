import bcrypt from 'bcrypt';
import config from 'config';

export const hashBcrypt = (text) =>
  bcrypt.hash(text, config.hash.bcrypt.saltRounds);

export const compareBcrypt = (text, hash) => bcrypt.compare(text, hash);

export const algorithms = {
  bcrypt: {
    hash: hashBcrypt,
    compare: compareBcrypt,
  },
};

export default {
  hash(hashFuncName, cleartext) {
    if (hashFuncName in algorithms) {
      return algorithms[hashFuncName].hash(cleartext);
    }

    throw new Error(`Unknown hash function ${hashFuncName}`);
  },

  compare(hashFuncName, cleartext, hash) {
    if (hashFuncName in algorithms) {
      return algorithms[hashFuncName].compare(cleartext, hash);
    }

    throw new Error(`Unknown hash function ${hashFuncName}`);
  },
};
