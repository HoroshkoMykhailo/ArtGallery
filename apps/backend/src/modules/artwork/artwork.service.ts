import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { type Express } from 'express';
import 'multer';
import { ILike, Repository } from 'typeorm';

import { saveFile } from '~/libs/helpers/helpers.js';

import { ArtWork } from './artwork.js';
import { ArtWorkError, SortOrder } from './libs/enums/enums.js';
import { transformArtWork } from './libs/helpers/transform-art-work.helper.js';
import {
  ArtWorkQuery,
  ArtWorkRequestDto,
  ArtWork as TArtWork,
  UpdateArtWorkRequestDto
} from './libs/types/types.js';

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
      throw new NotFoundException(ArtWorkError.NOT_FOUND);
    }

    const deletedArtWork = await this.artWorkRepository.remove(artWork);

    return !!deletedArtWork;
  }
  public async getArtWork(id: number): Promise<TArtWork> {
    const artWork = await this.artWorkRepository.findOne({
      where: { id }
    });

    if (!artWork) {
      throw new NotFoundException(ArtWorkError.NOT_FOUND);
    }

    return transformArtWork(artWork);
  }

  public async getArtWorks(query: ArtWorkQuery): Promise<TArtWork[]> {
    const { artist, price, title, type } = query;
    const order = price ? { price } : { id: SortOrder.ASC };

    const filter = {
      ...(type && { type }),
      ...(title && { title: ILike(`%${title}%`) }),
      ...(artist && { artist: ILike(`%${artist}%`) })
    };

    const artWorks = await this.artWorkRepository.find({
      order,
      where: filter
    });

    return artWorks.map(artWork => {
      return transformArtWork(artWork);
    });
  }
  public async updateArtWork(
    id: number,
    body: UpdateArtWorkRequestDto,
    file?: Express.Multer.File
  ): Promise<TArtWork> {
    const artWork = await this.artWorkRepository.findOne({
      where: { id }
    });

    if (!artWork) {
      throw new NotFoundException(ArtWorkError.NOT_FOUND);
    }

    const filePath = file ? saveFile(file) : artWork.image;

    Object.assign(artWork, {
      ...body,
      ...(filePath && { image: filePath })
    });

    return transformArtWork(await this.artWorkRepository.save(artWork));
  }
}

export { ArtWorkService };
