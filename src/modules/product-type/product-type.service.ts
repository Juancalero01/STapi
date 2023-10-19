import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductTypeEntity } from './product-type.entity';
import { Repository } from 'typeorm';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';

@Injectable()
export class ProductTypeService {
  constructor(
    @InjectRepository(ProductTypeEntity)
    private readonly productTypeRepository: Repository<ProductTypeEntity>,
  ) {}

  async findAll(): Promise<ProductTypeEntity[]> {
    try {
      return (
        (await this.productTypeRepository.find({
          select: ['id', 'name', 'prefix', 'isActive'],
          order: { isActive: 'DESC', prefix: 'ASC' },
        })) || []
      );
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<ProductTypeEntity> {
    try {
      return await this.productTypeRepository.findOne({
        select: ['id', 'name', 'prefix', 'isActive'],
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOnePrefix(prefix: string | null): Promise<ProductTypeEntity> {
    try {
      return await this.productTypeRepository.findOne({
        where: prefix === null ? { prefix: null } : { prefix },
      });
    } catch (error) {
      throw error;
    }
  }

  async create(body: CreateProductTypeDto): Promise<void> {
    try {
      if (await this.findOnePrefix(body.prefix)) {
        throw new HttpException(
          `Product type with prefix: ${body.prefix} already exists`,
          409,
        );
      }
      await this.productTypeRepository.save(body);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, body: UpdateProductTypeDto): Promise<void> {
    try {
      if (!(await this.findOne(id)))
        throw new HttpException(`Product type with id: ${id} not found`, 404);
      const productTypeFound = await this.findOnePrefix(body.prefix);
      if (productTypeFound && productTypeFound.id !== id)
        throw new HttpException(
          `Product type with prefix: ${body.prefix} already exists`,
          409,
        );
      await this.productTypeRepository.update(id, body);
    } catch (error) {
      throw error;
    }
  }
}
