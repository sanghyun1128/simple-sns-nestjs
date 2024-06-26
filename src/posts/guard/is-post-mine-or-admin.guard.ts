import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RolesEnum } from 'src/users/const/roles.const';
import { PostsService } from '../posts.service';
import { UsersModel } from 'src/users/entity/users.entity';
import { Request } from 'express';

@Injectable()
export class IsPostMineOrAdminGuard implements CanActivate {
  constructor(private readonly postsService: PostsService) {}
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

    const postId = request.params.postId;

    if (!postId) {
      throw new UnauthorizedException(
        'Cannot find post information. Please check your post id.',
      );
    }

    const isOk = await this.postsService.isPostMine(user.id, +postId);

    if (!isOk) {
      throw new ForbiddenException(
        'You are not authorized to access this post.',
      );
    }

    return isOk;
  }
}
