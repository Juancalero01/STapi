import { HttpException, Injectable } from '@nestjs/common';
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
      return await this.userRepository.find({
        select: ['id', 'username', 'fullname', 'email', 'role', 'isActive'],
        order: { role: { id: 'ASC' }, isActive: 'DESC' },
      });
    } catch (error) {
      throw error;
    }
  }

  async findAllActives(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.find({
        select: ['id', 'username', 'fullname', 'email', 'role', 'isActive'],
        where: { isActive: true },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<UserEntity> {
    try {
      return await this.userRepository.findOne({
        where: { id },
        select: ['id', 'username', 'fullname', 'email', 'role', 'isActive'],
      });
    } catch (error) {
      throw error;
    }
  }

  async findOneEmail(email: string): Promise<UserEntity> {
    try {
      return await this.userRepository.findOne({ where: { email } });
    } catch (error) {
      throw error;
    }
  }

  async findOneUsername(username: string): Promise<UserEntity> {
    try {
      return await this.userRepository.findOne({
        where: { username },
        select: [
          'id',
          'username',
          'fullname',
          'email',
          'role',
          'password',
          'isActive',
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  async create(body: CreateUserDto): Promise<void> {
    try {
      if (await this.findOneEmail(body.email))
        throw new HttpException('Email already exists', 409);
      if (await this.findOneUsername(body.username))
        throw new HttpException('Username already exists', 409);
      body.password = await hash(body.password, 10);
      await this.userRepository.save(body);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, body: UpdateUserDto): Promise<void> {
    try {
      if (!(await this.findOne(id))) {
        throw new HttpException('User not found', 404);
      }
      const userWithEmail = await this.findOneEmail(body.email);
      if (userWithEmail && userWithEmail.id !== id) {
        throw new HttpException(
          `User with email: ${body.email} already exists`,
          409,
        );
      }
      const userWithUsername = await this.findOneUsername(body.username);
      if (userWithUsername && userWithUsername.id !== id) {
        throw new HttpException(
          `User with username: ${body.username} already exists`,
          409,
        );
      }
      await this.userRepository.update(id, body);
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(id: number): Promise<void> {
    try {
      const userFound = await this.userRepository.findOne({ where: { id } });
      if (!userFound) throw new HttpException('User not found', 404);
      userFound.password = await hash(userFound.username, 10);
      await this.userRepository.update(id, userFound);
    } catch (error) {
      throw error;
    }
  }

  async changeState(id: number): Promise<void> {
    try {
      const userFound = await this.userRepository.findOne({ where: { id } });
      if (!userFound) throw new HttpException('User not found', 404);
      userFound.isActive = !userFound.isActive;
      await this.userRepository.update(id, userFound);
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(
    id: number,
    body: { fullname: string; password: string; newPassword: string },
  ): Promise<void> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        select: [
          'id',
          'username',
          'fullname',
          'email',
          'role',
          'password',
          'isActive',
        ],
      });
      if (!user) throw new HttpException('User not found', 404);
      const isMatch = await compare(body.password, user.password);
      if (!isMatch) {
        throw new HttpException('Invalid credentials', 401);
      }
      user.fullname = body.fullname;
      user.password = await hash(body.newPassword, 10);
      await this.userRepository.save(user);
    } catch (error) {
      throw error;
    }
  }
}
