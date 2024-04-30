import { HttpException, Injectable } from '@nestjs/common';
import { CreateProductPartTypeDto } from './dto/create-product-part-type.dto';
import { UpdateProductPartTypeDto } from './dto/update-product-part-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductPartTypeEntity } from './product-part-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductPartTypeService {
  constructor(
    @InjectRepository(ProductPartTypeEntity)
    private readonly productPartTypeRepository: Repository<ProductPartTypeEntity>,
  ) {}

  async findAll(): Promise<ProductPartTypeEntity[]> {
    try {
      return await this.productPartTypeRepository.find({
        order: {
          prefix: 'ASC',
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<ProductPartTypeEntity> {
    try {
      return await this.productPartTypeRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOnePrefix(prefix: string): Promise<ProductPartTypeEntity> {
    try {
      return await this.productPartTypeRepository.findOne({
        where: { prefix },
      });
    } catch (error) {
      throw error;
    }
  }

  async create(body: CreateProductPartTypeDto): Promise<void> {
    try {
      if (await this.findOnePrefix(body.prefix)) {
        throw new HttpException(
          `Product part type with prefix: ${body.prefix} already exists`,
          409,
        );
      }
      await this.productPartTypeRepository.save(body);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, body: UpdateProductPartTypeDto): Promise<void> {
    try {
      if (!(await this.findOne(id)))
        throw new HttpException(
          `Product part type with id: ${id} not found`,
          404,
        );
      const productPartTypeFound = await this.findOnePrefix(body.prefix);
      if (productPartTypeFound && productPartTypeFound.id)
        throw new HttpException(
          `Product part type with prefix: ${body.prefix} already exists`,
          409,
        );
      await this.productPartTypeRepository.update(id, body);
    } catch (error) {
      throw error;
    }
  }
}
