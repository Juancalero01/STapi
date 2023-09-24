import { Module } from '@nestjs/common';
import { ProductTypeController } from './product-type.controller';
import { ProductTypeService } from './product-type.service';
import { ProductTypeEntity } from './entity/product-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProductTypeEntity])],
  controllers: [ProductTypeController],
  providers: [ProductTypeService],
})
export class ProductTypeModule {}
