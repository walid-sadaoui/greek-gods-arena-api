import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || '3000',
  nodeEnv: process.env.NODE_ENV || 'development',
  clientUrl: process.env.CLIENT_URL,
  jwtSecret: process.env.JWT_SECRET,
  databaseUrl: process.env.DATABASE_URL,
};
