import {
  Controller,
  UploadedFile,
  UseInterceptors,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommonService } from './common.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AccessTokenGuard } from 'src/auth/guard/bearer-token.guard';

@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(AccessTokenGuard)
  postImage(@UploadedFile() file: Express.Multer.File) {
    return {
      fileName: file.filename,
    };
  }
}
