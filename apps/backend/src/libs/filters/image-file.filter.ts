import { BadRequestException } from '@nestjs/common';
import { type Express } from 'express';

const imageFileFilter = (
  _request: Express.Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void
): void => {
  if (!file.mimetype.startsWith('image/')) {
    callback(new BadRequestException('Only images are allowed'), false);

    return;
  }

  callback(null, true);
};

export { imageFileFilter };
