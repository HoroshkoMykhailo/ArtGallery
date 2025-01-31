import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { type Express } from 'express';
import { Repository } from 'typeorm';

import { saveFile } from '~/libs/helpers/helpers.js';

import { ArtWork } from './artwork.js';
import { transformArtWork } from './libs/helpers/transform-art-work.helper.js';
import { ArtWork as TArtWork } from './libs/types/types.js';

@Injectable()
class ArtWorkService {
  public constructor(
    @InjectRepository(ArtWork)
    private readonly artWorkRepository: Repository<ArtWork>
  ) {}

  public async createArtWork(file: Express.Multer.File): Promise<TArtWork> {
    const filePath = saveFile(file);

    const artWork = this.artWorkRepository.create({
      image: filePath
    });

    return transformArtWork(await this.artWorkRepository.save(artWork));
  }

  public async getArtWorks(): Promise<TArtWork[]> {
    const artWorks = await this.artWorkRepository.find();

    return artWorks.map(artWork => {
      return transformArtWork(artWork);
    });
  }
}

export { ArtWorkService };
