import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.find({
        select: [
          'id',
          'username',
          'email',
          'fullname',
          'createdAt',
          'updatedAt',
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.userRepository.findOne({
        where: { id },
        select: [
          'id',
          'username',
          'email',
          'fullname',
          'createdAt',
          'updatedAt',
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  async findOneEmail(email: string) {
    try {
      return await this.userRepository.findOne({ where: { email } });
    } catch (error) {
      throw error;
    }
  }

  async findOneUsername(username: string) {
    try {
      return await this.userRepository.findOne({ where: { username } });
    } catch (error) {
      throw error;
    }
  }

  async create(body: CreateUserDto): Promise<void> {
    try {
      if (
        !(await this.findOneEmail(body.email)) ||
        !(await this.findOneUsername(body.username))
      ) {
        const password = await hash(body.password, 10);
        await this.userRepository.save({ ...body, password });
      }
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, body: UpdateUserDto): Promise<void> {
    try {
      if (!(await this.findOne(id)))
        throw new HttpException('User not found', 404);
      if (await this.findOneEmail(body.email))
        throw new HttpException('Email already exists', 409);
      if (await this.findOneUsername(body.username))
        throw new HttpException('Username already exists', 409);
      const password = await hash(body.password, 10);
      body.password = password;
      await this.userRepository.update(id, body);
    } catch (error) {
      throw error;
    }
  }
}
