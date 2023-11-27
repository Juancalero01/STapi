import { HttpException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async findAll(): Promise<RoleEntity[]> {
    try {
      return await this.roleRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<RoleEntity> {
    try {
      return await this.roleRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOneName(name: string): Promise<RoleEntity> {
    try {
      return await this.roleRepository.findOne({
        where: { name },
      });
    } catch (error) {
      throw error;
    }
  }

  async create(body: CreateRoleDto) {
    try {
      if (await this.findOneName(body.name)) {
        throw new HttpException(
          `Role with name ${body.name} already exists`,
          409,
        );
      }
      await this.roleRepository.save(body);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, body: UpdateRoleDto): Promise<void> {
    try {
      if (!(await this.findOne(id)))
        throw new HttpException(`Role with id ${id} not found`, 404);
      const role = await this.findOneName(body.name);
      if (role && role.id != id)
        throw new HttpException(
          `Role with name ${body.name} already exists`,
          409,
        );
      await this.roleRepository.update(id, body);
    } catch (error) {}
  }
}
