import { beforeEach, describe, expect, it } from '@jest/globals';
import { Test, type TestingModule } from '@nestjs/testing';

import { ArtWorkService } from './artwork.service.js';

describe('ArtWorkService', () => {
  let service: ArtWorkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArtWorkService]
    }).compile();

    service = module.get<ArtWorkService>(ArtWorkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
