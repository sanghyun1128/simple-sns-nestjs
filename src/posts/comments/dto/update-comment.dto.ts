import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment-dto';

export class UpdateCommentsDto extends PartialType(CreateCommentDto) {}
