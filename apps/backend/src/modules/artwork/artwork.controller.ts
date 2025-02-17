import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse
} from '@nestjs/swagger';
import { type Express } from 'express';
import 'multer';

import { JoiValidationPipe } from '~/libs/helpers/helpers.js';

import { imageFileFilter } from '../../libs/filters/filters.js';
import { ArtWorkService } from './artwork.service.js';
import { ArtWorkError, ArtWorkType, SortOrder } from './libs/enums/enums.js';
import {
  type ArtWorkQuery,
  type ArtWorkRequestDto,
  type ArtWork as TArtWork,
  type UpdateArtWorkRequestDto
} from './libs/types/types.js';
import {
  artWorkValidationSchema,
  updateArtWorkValidationSchema
} from './libs/validation-schemas/validation-schemas.js';

@Controller('artworks')
class ArtWorksController {
  public constructor(
    @Inject(ArtWorkService)
    private readonly artWorkService: ArtWorkService
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: imageFileFilter
    })
  )
  @UsePipes(new JoiValidationPipe(artWorkValidationSchema))
  @ApiOperation({ summary: 'New artwork creation' })
  @ApiResponse({
    description: 'Artwork successfully created',
    status: HttpStatus.CREATED
  })
  @ApiResponse({
    description: 'Bad request',
    status: HttpStatus.BAD_REQUEST
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      properties: {
        artist: { example: 'John Doe', type: 'string' },
        availability: { example: true, type: 'boolean' },
        image: { format: 'binary', type: 'string' },
        price: { example: 100, type: 'number' },
        title: { example: 'Beautiful Painting', type: 'string' },
        type: { example: 'painting', type: 'string' }
      },
      type: 'object'
    }
  })
  public async createArtWork(
    @Body() body: ArtWorkRequestDto,
    @UploadedFile() file?: Express.Multer.File
  ): Promise<TArtWork> {
    return await this.artWorkService.createArtWork(body, file);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete artwork' })
  @ApiResponse({
    description: 'Artwork successfully deleted',
    status: HttpStatus.OK
  })
  @ApiResponse({
    description: ArtWorkError.NOT_FOUND,
    status: HttpStatus.NOT_FOUND
  })
  @ApiParam({ name: 'id', type: 'number' })
  public async deleteArtWork(@Param('id') id: number): Promise<boolean> {
    return await this.artWorkService.deleteArtWork(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get artwork' })
  @ApiResponse({
    description: 'Artwork successfully received',
    status: HttpStatus.OK
  })
  @ApiResponse({
    description: ArtWorkError.NOT_FOUND,
    status: HttpStatus.NOT_FOUND
  })
  @ApiParam({ name: 'id', type: 'number' })
  public async getArtWork(@Param('id') id: number): Promise<TArtWork> {
    return await this.artWorkService.getArtWork(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get artworks' })
  @ApiQuery({
    description: 'Sort artworks by price',
    enum: Object.values(SortOrder),
    name: 'price',
    required: false,
    type: 'string'
  })
  @ApiQuery({
    description: 'Filter artworks by type',
    enum: Object.values(ArtWorkType),
    name: 'type',
    required: false,
    type: 'string'
  })
  @ApiQuery({
    description: 'Filter artworks by artist',
    name: 'artist',
    required: false,
    type: 'string'
  })
  @ApiQuery({
    description: 'Filter artworks by title',
    name: 'title',
    required: false,
    type: 'string'
  })
  @ApiResponse({
    description: 'Artworks successfully received',
    status: HttpStatus.OK
  })
  public async getArtworks(@Query() query: ArtWorkQuery): Promise<TArtWork[]> {
    return await this.artWorkService.getArtWorks(query);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: imageFileFilter
    })
  )
  @UsePipes(new JoiValidationPipe(updateArtWorkValidationSchema))
  @ApiOperation({ summary: 'Update artwork' })
  @ApiResponse({
    description: 'Artwork successfully updated',
    status: HttpStatus.OK
  })
  @ApiResponse({
    description: ArtWorkError.NOT_FOUND,
    status: HttpStatus.NOT_FOUND
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      properties: {
        artist: { example: 'John Doe', type: 'string' },
        availability: { example: true, type: 'boolean' },
        image: { format: 'binary', type: 'string' },
        price: { example: 100, type: 'number' },
        title: { example: 'Beautiful Painting', type: 'string' },
        type: { example: 'painting', type: 'string' }
      }
    }
  })
  @ApiParam({ name: 'id', type: 'number' })
  public async updateArtWork(
    @Param('id') id: number,
    @Body() body: UpdateArtWorkRequestDto,
    @UploadedFile() file?: Express.Multer.File
  ): Promise<TArtWork> {
    return await this.artWorkService.updateArtWork(id, body, file);
  }
}

export { ArtWorksController };
