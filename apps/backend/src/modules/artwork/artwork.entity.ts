import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { type ValueOf } from '~/libs/types/types.js';

import { ArtWorkType } from './libs/enums/enums.js';

@Entity()
class ArtWork {
  @Column({ nullable: true, type: 'varchar' })
  @ApiProperty({ description: 'Artwork artist', example: 'artist' })
  public artist?: string;

  @Column({ nullable: true, type: 'boolean' })
  @ApiProperty({ description: 'Artwork availability', example: true })
  public availability?: boolean;

  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Unique artwork Id', example: 1 })
  public id!: number;

  @Column({ nullable: true, type: 'varchar' })
  @ApiProperty({ description: 'Artwork image url', example: 'imageUrl' })
  public image?: string;

  @Column({ nullable: true, type: 'int' })
  @ApiProperty({ description: 'Artwork price', example: 100 })
  public price?: number;

  @Column({ nullable: true, type: 'varchar' })
  @ApiProperty({ description: 'Artwork title', example: 'title' })
  public title?: string;

  @Column({ enum: ArtWorkType, nullable: true, type: 'enum' })
  @ApiProperty({ description: 'Artwork type', example: 'painting' })
  public type?: ValueOf<typeof ArtWorkType>;
}

export { ArtWork };
