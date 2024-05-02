import { Injectable } from '@nestjs/common';
import { CreateProductPartDto } from './dto/create-product-part.dto';
// import { UpdateProductPartDto } from './dto/update-product-part.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductPartEntity } from './product-part.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductPartService {
  constructor(
    @InjectRepository(ProductPartEntity)
    private readonly productPartRepository: Repository<ProductPartEntity>,
  ) {}

  async findAll(): Promise<ProductPartEntity[]> {
    try {
      return await this.productPartRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.productPartRepository.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOneSerial(serial: string): Promise<ProductPartEntity> {
    try {
      return await this.productPartRepository.findOne({ where: { serial } });
    } catch (error) {
      throw error;
    }
  }

  async create(body: CreateProductPartDto[]) {
    try {
      return await this.productPartRepository.save(body);
    } catch (error) {
      throw error;
    }
  }

  //TODO: No se realiza el update porque hay que definir como va a estar compuesto el historial de cambios de partes.
  // update(id: number, updateProductPartDto: UpdateProductPartDto) {
  //   return `This action updates a #${id} productPart`;
  // }
}
