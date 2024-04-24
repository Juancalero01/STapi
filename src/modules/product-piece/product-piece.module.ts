import { Module } from '@nestjs/common';
import { ProductPieceService } from './product-piece.service';
import { ProductPieceController } from './product-piece.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductPieceEntity } from './product-piece.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductPieceEntity])],
  controllers: [ProductPieceController],
  providers: [ProductPieceService],
})
export class ProductPieceModule {}
