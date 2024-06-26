import { Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from './decorator/roles.decorator';
import { RolesEnum } from './const/roles.const';
import { UsersModel } from './entity/users.entity';
import { User } from './decorator/user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(RolesEnum.ADMIN)
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('follow/me')
  async getFollow(@User() user: UsersModel) {
    return this.usersService.getFollowers(user.id);
  }

  @Post('follow/:id')
  async postFollow(@User() user: UsersModel, @Param('id') followeeId: number) {
    await this.usersService.followUser(user.id, followeeId);

    return true;
  }
}
