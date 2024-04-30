import { Module } from '@nestjs/common';
import { ProductPartService } from './product-part.service';
import { ProductPartController } from './product-part.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductPartEntity } from './product-part.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductPartEntity])],
  controllers: [ProductPartController],
  providers: [ProductPartService],
})
export class ProductPartModule {}
