import { Test, TestingModule } from '@nestjs/testing';
import { CommmonController } from './common.controller';
import { CommmonService } from './common.service';

describe('CommmonController', () => {
  let controller: CommmonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommmonController],
      providers: [CommmonService],
    }).compile();

    controller = module.get<CommmonController>(CommmonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
