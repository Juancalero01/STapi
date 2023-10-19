import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProvinceEntity } from './province.entity';
import { Repository } from 'typeorm';
import { CreateProvinceDto } from './dto/create-province.dto';

@Injectable()
export class ProvinceService {
  constructor(
    @InjectRepository(ProvinceEntity)
    private readonly provinceRepository: Repository<ProvinceEntity>,
  ) {}

  async findAll(): Promise<ProvinceEntity[]> {
    try {
      return await this.provinceRepository.find({
        select: ['id', 'name', 'isActive'],
        order: { name: 'ASC' },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<ProvinceEntity> {
    try {
      return await this.provinceRepository.findOne({
        where: { id },
        select: ['id', 'name', 'isActive'],
      });
    } catch (error) {
      throw error;
    }
  }

  async findOneName(name: string): Promise<ProvinceEntity> {
    try {
      return await this.provinceRepository.findOne({
        where: { name },
      });
    } catch (error) {
      throw error;
    }
  }

  async create(body: CreateProvinceDto): Promise<void> {
    try {
      if (await this.findOneName(body.name))
        throw new HttpException(
          `Province with name ${body.name} already exists`,
          409,
        );
      await this.provinceRepository.save(body);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, body: CreateProvinceDto): Promise<void> {
    try {
      if (!(await this.findOne(id)))
        throw new HttpException(`Province with id ${id} not found`, 404);
      const provinceFound = await this.findOneName(body.name);
      if (provinceFound && provinceFound.id !== id)
        throw new HttpException(
          `Province with name ${body.name} already exists`,
          409,
        );
      await this.provinceRepository.update(id, body);
    } catch (error) {
      throw error;
    }
  }
}
