import { type ArtWork } from '~/modules/artwork/artwork.js';

type DatabaseConfig = {
  database: string;
  entities: (typeof ArtWork)[];
  host: string;
  password: string;
  port: number;
  synchronize: boolean;
  type: string;
  username: string;
};

export { type DatabaseConfig as DbConfig };
