import { Module } from '@nestjs/common';
import { CommmonService } from './commmon.service';
import { CommmonController } from './commmon.controller';

@Module({
  controllers: [CommmonController],
  providers: [CommmonService],
})
export class CommmonModule {}
