import { Test, TestingModule } from '@nestjs/testing';
import { SheetsApiService } from './sheets-api.service';

describe('SheetsApiService', () => {
  let service: SheetsApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SheetsApiService],
    }).compile();

    service = module.get<SheetsApiService>(SheetsApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
