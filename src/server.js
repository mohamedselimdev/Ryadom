import { config } from './config/env.js';
import { sequelize } from './models/index.js';
import { createApp } from './app.js';

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log(`Database connected (${config.db.dialect})`);
  } catch (err) {
    console.error('Could not connect to the database:', err.message);
    process.exit(1);
  }

  createApp().listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`);
  });
}

start();
