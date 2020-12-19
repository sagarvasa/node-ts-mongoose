import { MongoConfig } from '../types';
const env: keyof typeof config = global.env as keyof typeof config;

/* database configuration based on environment
   replace with original values to get connected with database
*/
const local: MongoConfig = {
  host: '127.0.0.1',
  port: 27017,
  database: 'cinema',
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  poolSize: 3,
  timeout: 30000, // (30 * 1000ms = 30 sec)
};

const staging: MongoConfig = {
  host: 'staging-abc.docdb.amazonaws.com',
  port: 27017,
  database: 'cinema',
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  poolSize: 5,
  timeout: 30000,
};

const dev: MongoConfig = {
  host: 'dev-abc.docdb.amazonaws.com',
  port: 27017,
  database: 'cinema',
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  poolSize: 10,
  timeout: 30000,
};

const production: MongoConfig = {
  host: 'prd-abc.docdb.amazonaws.com',
  port: 27017,
  database: 'cinema',
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  poolSize: 10,
  timeout: 30000,
};

const config = { local, staging, production, dev };

export default config[env];
