import { Test, TestingModule } from '@nestjs/testing';
import { PosesController } from './poses.controller';
import { PosesService } from './poses.service';

describe('PosesController', () => {
  let controller: PosesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PosesController],
      providers: [PosesService],
    }).compile();

    controller = module.get<PosesController>(PosesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
