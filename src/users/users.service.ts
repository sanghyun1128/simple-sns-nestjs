import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersModel } from './entity/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersModel)
    private readonly usersRepository: Repository<UsersModel>,
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
    const user = await this.usersRepository.findOne({
      where: { id: followerId },
      relations: ['followees'],
    });

    if (!user) {
      throw new BadRequestException('Cannot find follower');
    }

    await this.usersRepository.save({
      ...user,
      followees: [...user.followees, { id: followeeId }],
    });
  }

  async getFollowers(userId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['followers'],
    });

    if (!user) {
      throw new BadRequestException('Cannot find user');
    }

    return user.followers;
  }
}
