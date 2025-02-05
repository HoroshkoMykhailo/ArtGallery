import { BadRequestException } from '@nestjs/common';
import axios from 'axios';
import { type Express } from 'express';
import 'multer';

import { OutsideApi } from '../config/outside-api.js';

type ImageBBResponse = {
  data: {
    url: string;
  };
};

const saveFile = async (file: Express.Multer.File): Promise<string> => {
  const form = new FormData();
  form.append('image', file.buffer.toString('base64'));

  try {
    const response = await axios.post<ImageBBResponse>(
      `${OutsideApi.IMAGE_API_URL}?key=${OutsideApi.IMAGE_API_KEY}`,
      form,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );

    return response.data.data.url;
  } catch {
    throw new BadRequestException('Failed to upload image');
  }
};

export { saveFile };
