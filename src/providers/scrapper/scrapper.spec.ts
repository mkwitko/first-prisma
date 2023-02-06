import { Test, TestingModule } from '@nestjs/testing';
import { Scrapper } from './scrapper';

describe('Scrapper', () => {
  let provider: Scrapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Scrapper],
    }).compile();

    provider = module.get<Scrapper>(Scrapper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
