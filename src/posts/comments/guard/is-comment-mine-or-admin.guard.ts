import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RolesEnum } from 'src/users/const/roles.const';
import { UsersModel } from 'src/users/entity/users.entity';
import { Request } from 'express';
import { CommentsService } from '../comments.service';

@Injectable()
export class IsCommentMineOrAdminGuard implements CanActivate {
  constructor(private readonly commentService: CommentsService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request & {
      user: UsersModel;
    };

    const { user } = request;

    if (!user) {
      throw new UnauthorizedException(
        'Cannot find user information. Please check your login status.',
      );
    }

    if (user.role === RolesEnum.ADMIN) return true;

    const commentId = request.params.commentId;

    if (!commentId) {
      throw new UnauthorizedException(
        'Cannot find post information. Please check your post id.',
      );
    }

    const isOk = await this.commentService.isCommentMine(user.id, +commentId);

    if (!isOk) {
      throw new ForbiddenException(
        'You are not authorized to access this post.',
      );
    }

    return isOk;
  }
}
