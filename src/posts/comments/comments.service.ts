import { BadRequestException, Injectable } from '@nestjs/common';
import { PaginateCommentDto } from './dto/paginate-comment.dto';
import { CommonService } from 'src/common/common.service';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentsModel } from './entity/comments.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment-dto';
import { UsersModel } from 'src/users/entity/users.entity';
import { DEFAULT_COMMENT_FIND_OPTIONS } from './const/default-comment-find-options.const';
import { UpdateCommentsDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsModel)
    private readonly commentsRepository: Repository<CommentsModel>,
    private readonly commonService: CommonService,
  ) {}

  async paginateComments(postId: number, dto: PaginateCommentDto) {
    return this.commonService.paginate(
      dto,
      this.commentsRepository,
      {
        ...DEFAULT_COMMENT_FIND_OPTIONS,
        where: {
          post: {
            id: postId,
          },
        },
      },
      `posts/${postId}/comments`,
    );
  }

  async getCommentById(commentId: number) {
    const comment = await this.commentsRepository.findOne({
      ...DEFAULT_COMMENT_FIND_OPTIONS,
      where: {
        id: commentId,
      },
    });

    if (!comment) {
      throw new BadRequestException('Comment not found');
    }
    return comment;
  }

  async createComment(
    postId: number,
    body: CreateCommentDto,
    author: UsersModel,
  ) {
    return this.commentsRepository.save({
      ...body,
      post: {
        id: postId,
      },
      author,
    });
  }

  async updateComment(dto: UpdateCommentsDto, commentId: number) {
    const prevComment = await this.commentsRepository.preload({
      id: commentId,
      ...dto,
    });

    const newComment = await this.commentsRepository.save(prevComment);

    return newComment;
  }
}
