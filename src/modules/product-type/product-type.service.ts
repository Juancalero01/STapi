import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductTypeEntity } from './entity/product-type.entity';
import { Repository } from 'typeorm';
import { CreateProductTypeDto } from './dto/create-type-product.dto';
import { UpdateProductTypeDto } from './dto/update-type-product.dto';

@Injectable()
export class ProductTypeService {
  constructor(
    @InjectRepository(ProductTypeEntity)
    private readonly productTypeRepository: Repository<ProductTypeEntity>,
  ) {}

  async findAll(): Promise<ProductTypeEntity[]> {
    try {
      return await this.productTypeRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<ProductTypeEntity> {
    try {
      return await this.productTypeRepository.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async findOneByPrefixOrName(
    prefix: string,
    name: string,
  ): Promise<ProductTypeEntity> {
    try {
      return await this.productTypeRepository.findOne({
        where: [{ prefix }, { name }],
      });
    } catch (error) {
      throw error;
    }
  }

  async create(
    createProductTypeDto: CreateProductTypeDto,
  ): Promise<CreateProductTypeDto> {
    try {
      const productTypeFound = await this.findOneByPrefixOrName(
        createProductTypeDto.prefix,
        createProductTypeDto.name,
      );
      if (!productTypeFound)
        await this.productTypeRepository.save(createProductTypeDto);
      return productTypeFound;
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    updateProductTypeDto: UpdateProductTypeDto,
  ): Promise<UpdateProductTypeDto> {
    try {
      const productTypeFound = await this.findOne(id);
      if (productTypeFound)
        await this.productTypeRepository.update(id, updateProductTypeDto);
      return productTypeFound;
    } catch (error) {
      throw error;
    }
  }

  // imports
  async importProductTypes(
    productTypes: CreateProductTypeDto[],
  ): Promise<void> {
    try {
      await this.productTypeRepository.save(productTypes);
    } catch (error) {
      throw error;
    }
  }
}
