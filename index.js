if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  require('dotenv').config();
}

require('@babel/register');
require('./src/main');
