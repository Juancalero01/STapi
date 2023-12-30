import { HttpException, Injectable } from '@nestjs/common';
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
        order: {
          productType: {
            id: 'ASC',
          },
        },
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
      return await this.productRepository.findOne({ where: { serial } });
    } catch (error) {
      throw error;
    }
  }

  async create(body: CreateProductDto): Promise<void> {
    try {
      if (await this.findOneSerial(body.serial))
        throw new HttpException(
          `Product with serial ${body.serial} already exists`,
          409,
        );
      await this.productRepository.save(body);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, body: UpdateProductDto): Promise<void> {
    try {
      if (!(await this.findOne(id)))
        throw new HttpException(`Product with id ${id} not found`, 404);
      const productFound = await this.findOneSerial(body.serial);
      if (productFound && productFound.id !== id)
        throw new HttpException(
          `Product with serial ${body.serial} already exists`,
          409,
        );
      await this.productRepository.update(id, body);
    } catch (error) {
      throw error;
    }
  }
}
