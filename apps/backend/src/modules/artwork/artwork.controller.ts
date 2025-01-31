import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse
} from '@nestjs/swagger';
import { type Express } from 'express';

import { imageFileFilter } from '../../libs/filters/filters.js';
import { ArtWorkService } from './artwork.service.js';
import { ArtWork as TArtWork } from './libs/types/types.js';

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
  @ApiOperation({ summary: 'New artwork creation' })
  @ApiResponse({
    description: 'Artwork successfully created',
    status: HttpStatus.CREATED
  })
  @ApiResponse({
    description: 'Only images are allowed',
    status: HttpStatus.BAD_REQUEST
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      properties: {
        image: { format: 'binary', type: 'string' }
      },

      type: 'object'
    }
  })
  public async createArtWork(
    @UploadedFile() file: Express.Multer.File
  ): Promise<TArtWork> {
    return await this.artWorkService.createArtWork(file);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete artwork' })
  @ApiResponse({
    description: 'Artwork successfully deleted',
    status: HttpStatus.OK
  })
  @ApiResponse({
    description: 'Artwork not found',
    status: HttpStatus.NOT_FOUND
  })
  @ApiParam({ name: 'id', type: 'number' })
  public async deleteArtWork(@Param('id') id: number): Promise<boolean> {
    return await this.artWorkService.deleteArtWork(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get artwork' })
  @ApiResponse({ description: 'Successful response', status: HttpStatus.OK })
  @ApiResponse({
    description: 'Artwork not found',
    status: HttpStatus.NOT_FOUND
  })
  @ApiParam({ name: 'id', type: 'number' })
  public async getArtWork(@Param('id') id: number): Promise<TArtWork> {
    return await this.artWorkService.getArtWork(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get artworks' })
  @ApiResponse({ description: 'Successful response', status: HttpStatus.OK })
  public async getArtworks(): Promise<TArtWork[]> {
    return await this.artWorkService.getArtWorks();
  }
}

export { ArtWorksController };
