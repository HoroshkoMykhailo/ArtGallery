import { beforeEach, describe, expect, it } from '@jest/globals';
import { Test, type TestingModule } from '@nestjs/testing';

import { ArtWorksController } from './artwork.controller.js';

describe('ArtWorksController', () => {
  let controller: ArtWorksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtWorksController]
    }).compile();

    controller = module.get<ArtWorksController>(ArtWorksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
