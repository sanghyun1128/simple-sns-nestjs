import { Controller } from '@nestjs/common';
import { CommmonService } from './commmon.service';

@Controller('commmon')
export class CommmonController {
  constructor(private readonly commmonService: CommmonService) {}
}
