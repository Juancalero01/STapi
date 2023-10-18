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
      const products = await this.productRepository
        .createQueryBuilder('product')
        .select([
          'product.id',
          'product.serial',
          'product.reference',
          'product.deliveryDate',
          'client.id',
          'client.taxpayerName',
          'productType.id',
          'productType.name',
        ])
        .innerJoin('product.client', 'client')
        .innerJoin('product.productType', 'productType')
        .getMany();

      return products || [];
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<ProductEntity> {
    try {
      const product = await this.productRepository
        .createQueryBuilder('product')
        .select([
          'product.id',
          'product.serial',
          'product.reference',
          'product.deliveryDate',
          'client.id',
          'client.taxpayerName',
          'productType.id',
          'productType.name',
        ])
        .innerJoin('product.client', 'client')
        .innerJoin('product.productType', 'productType')
        .where(`product.id = ${id}`)
        .getOne();

      return product || null;
    } catch (error) {
      throw error;
    }
  }

  async findOneSerial(serial: string): Promise<ProductEntity> {
    try {
      const product = await this.productRepository
        .createQueryBuilder('product')
        .select([
          'product.id',
          'product.serial',
          'product.reference',
          'product.deliveryDate',
          'client.id',
          'client.taxpayerName',
          'productType.id',
          'productType.name',
        ])
        .innerJoin('product.client', 'client')
        .innerJoin('product.productType', 'productType')
        .where(`product.serial = "${serial}"`)
        .getOne();

      return product || null;
    } catch (error) {
      throw error;
    }
  }

  async create(body: CreateProductDto): Promise<void> {
    try {
      if (await this.findOneSerial(body.serial)) {
        throw new HttpException(
          `Product with serial ${body.serial} already exists`,
          409,
        );
      }
      await this.productRepository.save(body);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, body: UpdateProductDto): Promise<void> {
    try {
      if (!(await this.findOne(id))) {
        throw new HttpException(`Product with id ${id} not found`, 404);
      }
      if (body.serial && (await this.findOneSerial(body.serial))) {
        throw new HttpException(
          `Product with serial ${body.serial} already exists`,
          409,
        );
      }
      await this.productRepository.update(id, body);
    } catch (error) {
      throw error;
    }
  }
}
