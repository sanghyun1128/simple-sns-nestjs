import { Controller } from '@nestjs/common';
import { CommmonService } from './common.service';

@Controller('commmon')
export class CommmonController {
  constructor(private readonly commmonService: CommmonService) {}
}
