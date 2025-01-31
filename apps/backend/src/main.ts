import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import 'reflect-metadata';

import { AppModule } from './app.module.js';
import { staticPath } from './libs/constants/constants.js';

const DEFAULT_PORT = 3000;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true
    })
  );

  app.use('/static', express.static(staticPath));

  const config = new DocumentBuilder()
    .setTitle('ArtGallery API')
    .setDescription('API for managing artworks in gallery')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env['PORT'] ?? DEFAULT_PORT);
}

await bootstrap();
