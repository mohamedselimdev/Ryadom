import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import { config } from './env.js';

function createSequelize() {
  const { db } = config;

  if (db.dialect === 'sqlite') {
    fs.mkdirSync(path.dirname(path.resolve(db.storage)), { recursive: true });
    return new Sequelize({ dialect: 'sqlite', storage: db.storage, logging: false });
  }

  return new Sequelize(db.name, db.user, db.password, {
    host: db.host,
    port: db.port,
    dialect: db.dialect,
    logging: false,
  });
}

export const sequelize = createSequelize();
