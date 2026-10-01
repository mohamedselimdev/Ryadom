import { config } from '../src/config/env.js';
import { sequelize } from '../src/config/db.js';

try {
  await sequelize.authenticate();
  console.log(`Connected to database (${config.db.dialect})`);
} catch (err) {
  console.error('Connection error:', err.message);
  process.exitCode = 1;
} finally {
  await sequelize.close();
}
