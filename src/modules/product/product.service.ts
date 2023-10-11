import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    try {
      return await this.productRepository.find({
        relations: ['client', 'productType'],
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<ProductEntity> {
    try {
      return await this.productRepository.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async findOneSerial(serial: string): Promise<ProductEntity> {
    try {
      return await this.productRepository.findOne({
        where: { serial },
        relations: ['client', 'productType'],
      });
    } catch (error) {
      throw error;
    }
  }

  async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    try {
      const productFound = await this.findOneSerial(createProductDto.serial);
      if (!productFound) await this.productRepository.save(createProductDto);
      return productFound;
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    try {
      const productFound = await this.findOne(id);
      if (productFound) await this.productRepository.save(updateProductDto);
      return productFound;
    } catch (error) {
      throw error;
    }
  }

  async importProducts(products: CreateProductDto[]): Promise<void> {
    try {
      await this.productRepository.save(products);
    } catch (error) {
      throw error;
    }
  }
}
