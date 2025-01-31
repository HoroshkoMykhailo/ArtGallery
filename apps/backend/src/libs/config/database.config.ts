import * as dotenv from 'dotenv';

import { ArtWork } from '../../modules/artwork/artwork.entity.js';
import { type DbConfig as DatabaseConfig } from './libs/types/dbconfig.type.js';

dotenv.config();

const dbconfig: DatabaseConfig = {
  database: process.env['DB_NAME'] ?? 'art_gallery',
  entities: [ArtWork],
  host: process.env['DB_HOST'] ?? 'localhost',
  password: process.env['DB_PASSWORD'] ?? 'postgres',
  port: Number.parseInt(process.env['DB_PORT'] ?? '5432', 10),
  synchronize: process.env['DB_SYNCHRONIZE'] === 'true',
  type: 'postgres',
  username: process.env['DB_USERNAME'] ?? 'postgres'
};

export { dbconfig };
