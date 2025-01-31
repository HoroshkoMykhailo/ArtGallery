import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArtWorksController } from './artwork.controller.js';
import { ArtWork } from './artwork.js';
import { ArtWorkService } from './artwork.service.js';

@Module({
  controllers: [ArtWorksController],
  imports: [TypeOrmModule.forFeature([ArtWork])],
  providers: [ArtWorkService]
})
class ArtWorksModule {}

export { ArtWorksModule };
