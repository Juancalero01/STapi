import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';

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

  async findOne(id: number): Promise<UserEntity> {
    try {
      return await this.userRepository.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async findOneByUsername(username: string): Promise<UserEntity> {
    try {
      return await this.userRepository.findOne({ where: { username } });
    } catch (error) {
      throw error;
    }
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity | void> {
    try {
      const user = await this.findOneByUsername(createUserDto.username);
      if (!user) {
        const passwordHash = await this.hashPassword(createUserDto.password);
        await this.userRepository.save({
          ...createUserDto,
          password: passwordHash,
        });
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity | void> {
    try {
      const user = this.findOne(id);
      if (user) {
        this.userRepository.update(id, updateUserDto);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async checkPassword(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }

  async hashPassword(password: string): Promise<string> {
    return await hash(password, 10);
  }
}
