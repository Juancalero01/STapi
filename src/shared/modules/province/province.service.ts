import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProvinceEntity } from './province.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProvinceService {
  constructor(
    @InjectRepository(ProvinceEntity)
    private readonly provinceRepository: Repository<ProvinceEntity>,
  ) {}

  async findAll(): Promise<ProvinceEntity[]> {
    try {
      return await this.provinceRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<ProvinceEntity> {
    try {
      return await this.provinceRepository.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }
}
