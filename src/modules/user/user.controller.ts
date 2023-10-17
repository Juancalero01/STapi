import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  HttpException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async findAll(): Promise<UserEntity[]> {
    try {
      const users = await this.userService.findAll();
      if (!users.length) throw new HttpException('Users not found', 404);
      return users;
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<UserEntity> {
    try {
      const user = await this.userService.findOne(id);
      if (!user) throw new HttpException('User not found', 404);
      return user;
    } catch (error) {
      throw error;
    }
  }

  @Post('/')
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    try {
      if (await this.userService.create(createUserDto))
        throw new HttpException('User already exists', 409);
    } catch (error) {
      throw error;
    }
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    try {
      if (!(await this.userService.update(id, updateUserDto)))
        throw new HttpException('User not found', 404);
    } catch (error) {
      throw error;
    }
  }
}
