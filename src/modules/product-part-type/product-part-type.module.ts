import { Module } from '@nestjs/common';
import { ProductPartTypeService } from './product-part-type.service';
import { ProductPartTypeController } from './product-part-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductPartTypeEntity } from './product-part-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductPartTypeEntity])],
  controllers: [ProductPartTypeController],
  providers: [ProductPartTypeService],
})
export class ProductPartTypeModule {}
