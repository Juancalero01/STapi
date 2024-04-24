import { Injectable } from '@nestjs/common';
import { CreateProductPieceDto } from './dto/create-product-piece.dto';
import { UpdateProductPieceDto } from './dto/update-product-piece.dto';
import { ProductPieceEntity } from './product-piece.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductPieceService {
  constructor(
    @InjectRepository(ProductPieceEntity)
    private readonly productPieceRepository: Repository<ProductPieceEntity>,
  ) {}

  async findAll(): Promise<ProductPieceEntity[]> {
    try {
      return await this.productPieceRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<ProductPieceEntity> {
    try {
      return await this.productPieceRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  //TODO: Implementar el SAVE y el UPDATE de los datos que se van a guardar en la DB
  // async create(body: CreateProductPieceDto[]): Promise<void> {
  //   try {
  //     await this.productPieceRepository.save(body);
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // update(id: number, updateProductPieceDto: UpdateProductPieceDto) {
  //   return `This action updates a #${id} productPiece`;
  // }
}
