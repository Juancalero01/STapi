import { Injectable } from '@nestjs/common';
import { CreateProductPartHistoryDto } from './dto/create-product-part-history.dto';
import { UpdateProductPartHistoryDto } from './dto/update-product-part-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductPartHistoryEntity } from './product-part-history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductPartHistoryService {
  constructor(
    @InjectRepository(ProductPartHistoryEntity)
    private readonly productPartHistoryRepository: Repository<ProductPartHistoryEntity>,
  ) {}

  async create(body: CreateProductPartHistoryDto): Promise<void> {
    try {
      await this.productPartHistoryRepository.save(body);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<ProductPartHistoryEntity[]> {
    try {
      return this.productPartHistoryRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<ProductPartHistoryEntity> {
    try {
      return this.productPartHistoryRepository.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, body: UpdateProductPartHistoryDto): Promise<void> {
    try {
      await this.productPartHistoryRepository.update(id, body);
    } catch (error) {
      throw error;
    }
  }
}
