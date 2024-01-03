import { Test, TestingModule } from '@nestjs/testing';
import { SessionCustomController } from './session_custom.controller';
import { SessionCustomService } from './session_custom.service';

describe('SessionCustomController', () => {
  let controller: SessionCustomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SessionCustomController],
      providers: [SessionCustomService],
    }).compile();

    controller = module.get<SessionCustomController>(SessionCustomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
