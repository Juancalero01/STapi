import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { JwtGuard } from '../auth/jwt/jwt.guard';
import { RolesGuard } from './common/role.guard';
import { Roles } from './common/role.decorator';

@UseGuards(JwtGuard, RolesGuard)
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('/')
  @Roles('ADMINISTRADOR')
  async findAll() {
    try {
      return await this.roleService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  @Roles('ADMINISTRADOR')
  findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.roleService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Post('/')
  @Roles('ADMINISTRADOR')
  create(@Body() body: CreateRoleDto) {
    try {
      return this.roleService.create(body);
    } catch (error) {
      throw error;
    }
  }

  @Put('/:id')
  @Roles('ADMINISTRADOR')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateRoleDto) {
    try {
      return this.roleService.update(id, body);
    } catch (error) {
      throw error;
    }
  }
}
