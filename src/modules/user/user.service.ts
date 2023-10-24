import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.userRepository.findOne({ where: { id } });
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

  // refactorizar endpoint
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
      await this.userRepository.update(id, body);
    } catch (error) {
      throw error;
    }
  }
}
