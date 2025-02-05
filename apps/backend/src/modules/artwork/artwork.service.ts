import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

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

  public async createArtWork(body: ArtWorkRequestDto): Promise<TArtWork> {
    const { artist, availability, price, title, type } = body;

    const artWork = this.artWorkRepository.create({
      artist,
      availability: availability || false,
      price,
      title,
      type
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
    body: UpdateArtWorkRequestDto
  ): Promise<TArtWork> {
    const artWork = await this.artWorkRepository.findOne({
      where: { id }
    });

    if (!artWork) {
      throw new NotFoundException(ArtWorkError.NOT_FOUND);
    }

    Object.assign(artWork, {
      ...body
    });

    return transformArtWork(await this.artWorkRepository.save(artWork));
  }
}

export { ArtWorkService };
