import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const jwtSecret = process.env.JWT_SECRET;
const weakSecrets = ['', 'your_jwt_secret', 'your-secret-key', 'change_me'];

if (!jwtSecret || weakSecrets.includes(jwtSecret) || jwtSecret.length < 32) {
  if (isProduction) {
    throw new Error('JWT_SECRET must be set to a random string of at least 32 characters');
  }
  console.warn('[config] JWT_SECRET is missing or weak. Set a strong value in .env before deploying.');
}

export const config = {
  env: process.env.NODE_ENV || 'development',
  isProduction,
  port: Number(process.env.PORT) || 5000,
  corsOrigin: process.env.CORS_ORIGIN || '',
  jwt: {
    secret: jwtSecret || 'dev-only-insecure-secret-do-not-use-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  },
  db: {
    dialect: process.env.DB_DIALECT || 'postgres',
    storage: process.env.DB_STORAGE || 'data/ryadom.sqlite',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    name: process.env.DB_NAME || 'ryadom_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
  },
  aiServiceUrl: process.env.AI_SERVICE_URL || '',
};
