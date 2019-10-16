const isProd = process.env.NODE_ENV === 'production';

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8080;
const protocol = isProd ? 'https' : 'http';

export default {
  host,
  port,
  protocol,
  url: `${protocol}://${host}${isProd ? '' : `:${port}`}`,

  app: {
    secret1: process.env.SECRET1 || 'APIKO_SIKRIT1',
    secret2: process.env.SECRET2 || 'APIKO_SIKRIT2',
  },

  cloudinary: {
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  },

  hash: {
    default: 'bcrypt',

    bcrypt: {
      saltRounds: 10,
    },
  },

  db: {
    ssl: process.env.PGSSL || false,
    connectionString:
      process.env.DATABASE_URL ||
      'postgres://postgres:@localhost:5432/apiko_courses',
  },
};
