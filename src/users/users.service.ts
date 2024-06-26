import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersModel } from './entity/users.entity';
import { UserFollowersModel } from './entity/user-followers.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersModel)
    private readonly usersRepository: Repository<UsersModel>,
    @InjectRepository(UserFollowersModel)
    private readonly userFollowersRepository: Repository<UserFollowersModel>,
  ) {}

  async createUser(user: Pick<UsersModel, 'nickname' | 'email' | 'password'>) {
    const nicknameExists = await this.usersRepository.findOne({
      where: { nickname: user.nickname },
    });

    if (nicknameExists) {
      throw new Error('이미 존재하는 닉네임입니다.');
    }

    const emailExists = await this.usersRepository.findOne({
      where: { email: user.email },
    });

    if (emailExists) {
      throw new Error('이미 가입한 이메일입니다.');
    }

    const userObject = this.usersRepository.create({
      nickname: user.nickname,
      email: user.email,
      password: user.password,
    });
    const newUser = await this.usersRepository.save(userObject);

    return newUser;
  }

  async getAllUsers() {
    return this.usersRepository.find();
  }

  async getUserByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  async followUser(followerId: number, followeeId: number) {
    const result = await this.userFollowersRepository.save({
      follower: { id: followerId },
      followee: { id: followeeId },
    });

    return true;
  }

  async getFollowers(userId: number, isIncludeConfirmed: boolean) {
    const where = { followee: { id: userId } };

    if (!isIncludeConfirmed) {
      where['isConfirmed'] = true;
    }

    const result = await this.userFollowersRepository.find({
      where,
      relations: ['follower', 'followee'],
    });

    return result.map((item) => ({
      id: item.follower.id,
      nickname: item.follower.nickname,
      isConfirmed: item.isConfirmed,
    }));
  }

  async confirmFollow(followerId: number, followeeId: number) {
    const exist = await this.userFollowersRepository.findOne({
      where: { follower: { id: followerId }, followee: { id: followeeId } },
    });

    if (!exist) {
      throw new BadRequestException('팔로우 요청을 찾을 수 없습니다.');
    }

    await this.userFollowersRepository.save({
      ...exist,
      isConfirmed: true,
    });

    return true;
  }

  async unfollowUser(followerId: number, followeeId: number) {
    await this.userFollowersRepository.delete({
      follower: { id: followerId },
      followee: { id: followeeId },
    });

    return true;
  }
}
