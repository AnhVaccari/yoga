import { Test, TestingModule } from '@nestjs/testing';
import { DifficultiesService } from './difficulties.service';

describe('DifficultiesService', () => {
  let service: DifficultiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DifficultiesService],
    }).compile();

    service = module.get<DifficultiesService>(DifficultiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
