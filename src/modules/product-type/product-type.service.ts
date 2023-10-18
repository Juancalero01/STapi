import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductTypeEntity } from './product-type.entity';
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
      return (
        (await this.productTypeRepository.find({
          select: ['id', 'name', 'prefix'],
          order: { name: 'ASC' },
        })) || []
      );
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<ProductTypeEntity> {
    try {
      return (
        (await this.productTypeRepository.findOne({ where: { id } })) || null
      );
    } catch (error) {
      throw error;
    }
  }

  async findOnePrefix(prefix: string | null): Promise<ProductTypeEntity> {
    try {
      return await this.productTypeRepository
        .createQueryBuilder('productType')
        .where(`productType.prefix = ${prefix}`)
        .getOne();
    } catch (error) {
      throw error;
    }
  }

  async create(body: CreateProductTypeDto): Promise<void> {
    try {
      const productTypeFound = await this.findOnePrefix(body.prefix);
      if (
        productTypeFound ||
        (body.prefix === null && productTypeFound !== null)
      ) {
        throw new HttpException(
          `Product type with prefix: ${body.prefix} already exists`,
          409,
        );
      }
      await this.productTypeRepository.save(body);
    } catch (error) {
      throw error;
    }

    // try {
    //   const productTypeFound = await this.findOnePrefix(body.prefix);
    //   if (body.prefix === null && !productTypeFound) {
    //     await this.productTypeRepository.save(body);
    //   } else if (productTypeFound) {
    //     throw new HttpException(
    //       `Product type with prefix: ${body.prefix} already exists`,
    //       409,
    //     );
    //   } else {
    //     throw new HttpException(`Product type prefix cannot be null`, 409);
    //   }
    // } catch (error) {
    //   throw error;
    // }
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

//refactorizar todo el servicio y el controlador de product-type
