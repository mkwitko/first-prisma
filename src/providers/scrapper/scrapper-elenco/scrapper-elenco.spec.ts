import { Test, TestingModule } from '@nestjs/testing';
import { ScrapperElenco } from './scrapper-elenco';

describe('ScrapperElenco', () => {
  let provider: ScrapperElenco;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScrapperElenco],
    }).compile();

    provider = module.get<ScrapperElenco>(ScrapperElenco);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
