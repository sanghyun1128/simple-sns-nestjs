import { Test, TestingModule } from '@nestjs/testing';
import { CommmonService } from './commmon.service';

describe('CommmonService', () => {
  let service: CommmonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommmonService],
    }).compile();

    service = module.get<CommmonService>(CommmonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
