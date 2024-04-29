import { Module } from '@nestjs/common';
import { CommmonService } from './common.service';
import { CommmonController } from './common.controller';

@Module({
  controllers: [CommmonController],
  providers: [CommmonService],
  exports: [CommmonService],
})
export class CommmonModule {}
