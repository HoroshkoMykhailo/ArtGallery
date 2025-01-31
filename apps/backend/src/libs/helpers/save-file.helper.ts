import { type Express } from 'express';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { v4 as uuidv4 } from 'uuid';

import { staticPath } from '../constants/constants.js';

const saveFile = (file: Express.Multer.File): string => {
  const uniqueFileName = `${uuidv4()}${path.extname(file.originalname)}`;
  const uploadFolder = staticPath;

  if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true });
  }

  const filePath = path.join(uploadFolder, uniqueFileName);
  fs.writeFileSync(filePath, file.buffer);

  return `/static/${uniqueFileName}`;
};

export { saveFile };
