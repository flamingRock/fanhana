import dotenv from 'dotenv';

dotenv.config();

export const env = {
  // BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
  PORT: process.env.PORT,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DBNAME: process.env.DB_DBNAME,
  STATIC_PATH: process.env.STATIC_PATH,
  FILE_PATH: process.env.FILE_PATH,

  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_USERNAME: process.env.REDIS_USERNAME,
  REDIS_PASSWORD:process.env.REDIS_PASSWORD,

  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
};
