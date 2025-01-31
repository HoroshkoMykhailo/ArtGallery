import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { dbconfig } from './libs/config/database.config.js';
import { ArtWorksModule } from './modules/artwork/artwork.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dbconfig,
      type: 'postgres'
    }),
    ArtWorksModule
  ]
})
class AppModule {}

export { AppModule };
