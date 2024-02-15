import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';
import { JwtGuard } from '../auth/jwt/jwt.guard';
import { RolesGuard } from '../role/common/role.guard';
import { Roles } from '../role/common/role.decorator';

@UseGuards(JwtGuard, RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @Roles('ADMINISTRADOR')
  async findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Get('/a')
  @Roles('ADMINISTRADOR')
  async findAllActives(): Promise<UserEntity[]> {
    return this.userService.findAllActives();
  }

  @Get('/:id')
  @Roles('ADMINISTRADOR')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    return this.userService.findOne(id);
  }

  @Post('/')
  @Roles('ADMINISTRADOR')
  async create(@Body() body: CreateUserDto): Promise<void> {
    try {
      return await this.userService.create(body);
    } catch (error) {
      throw error;
    }
  }

  @Put('/r/:id')
  @Roles('ADMINISTRADOR')
  async resetPassword(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.resetPassword(id);
  }

  @Put('/s/:id')
  @Roles('ADMINISTRADOR')
  async changeState(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.changeState(id);
  }

  @Put('/:id')
  @Roles('ADMINISTRADOR')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ): Promise<void> {
    return this.userService.update(id, body);
  }

  @Put('/pu/:id')
  @Roles('ADMINISTRADOR', 'TECNICO')
  async updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() body,
  ): Promise<void> {
    return this.userService.updateProfile(id, body);
  }
}
