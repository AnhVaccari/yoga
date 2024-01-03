import { Test, TestingModule } from '@nestjs/testing';
import { SessionCustomService } from './session_custom.service';

describe('SessionCustomService', () => {
  let service: SessionCustomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionCustomService],
    }).compile();

    service = module.get<SessionCustomService>(SessionCustomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
