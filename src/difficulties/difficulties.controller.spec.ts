import { Test, TestingModule } from '@nestjs/testing';
import { DifficultiesController } from './difficulties.controller';

describe('DifficultiesController', () => {
  let controller: DifficultiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DifficultiesController],
    }).compile();

    controller = module.get<DifficultiesController>(DifficultiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
