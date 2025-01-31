import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { type Express } from 'express';
import 'multer';
import { Repository } from 'typeorm';

import { saveFile } from '~/libs/helpers/helpers.js';
import { ValueOf } from '~/libs/types/types.js';

import { ArtWork } from './artwork.js';
import { SortOrder } from './libs/enums/enums.js';
import { transformArtWork } from './libs/helpers/transform-art-work.helper.js';
import { ArtWorkRequestDto, ArtWork as TArtWork } from './libs/types/types.js';

@Injectable()
class ArtWorkService {
  public constructor(
    @InjectRepository(ArtWork)
    private readonly artWorkRepository: Repository<ArtWork>
  ) {}

  public async createArtWork(
    body: ArtWorkRequestDto,
    file?: Express.Multer.File
  ): Promise<TArtWork> {
    const filePath = file ? saveFile(file) : undefined;
    const { artist, availability, price, title, type } = body;

    const artWork = this.artWorkRepository.create({
      artist,
      availability: availability || false,
      price,
      title,
      type,
      ...(filePath && { image: filePath })
    });

    return transformArtWork(await this.artWorkRepository.save(artWork));
  }

  public async deleteArtWork(id: number): Promise<boolean> {
    const artWork = await this.artWorkRepository.findOne({
      where: { id }
    });

    if (!artWork) {
      throw new NotFoundException('Artwork not found');
    }

    const deletedArtWork = await this.artWorkRepository.remove(artWork);

    return !!deletedArtWork;
  }

  public async getArtWork(id: number): Promise<TArtWork> {
    const artWork = await this.artWorkRepository.findOne({
      where: { id }
    });

    if (!artWork) {
      throw new NotFoundException('Artwork not found');
    }

    return transformArtWork(artWork);
  }
  public async getArtWorks(
    price?: ValueOf<typeof SortOrder>
  ): Promise<TArtWork[]> {
    const order = price ? { price } : {};
    const artWorks = await this.artWorkRepository.find({
      order
    });

    return artWorks.map(artWork => {
      return transformArtWork(artWork);
    });
  }
}

export { ArtWorkService };
