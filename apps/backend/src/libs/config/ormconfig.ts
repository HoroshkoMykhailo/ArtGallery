import { DataSource } from 'typeorm';

import { dbconfig } from './database.config.js';

export default new DataSource({
  ...dbconfig,
  migrations: ['./src/migrations/*.ts'],
  type: 'postgres'
});
