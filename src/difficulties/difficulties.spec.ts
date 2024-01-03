import { Test, TestingModule } from '@nestjs/testing';
import { Difficulties } from './difficulties.providers';

describe('Difficulties', () => {
  let provider: Difficulties;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Difficulties],
    }).compile();

    provider = module.get<Difficulties>(Difficulties);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
