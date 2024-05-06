import { Module } from '@nestjs/common';
import { ProductPartHistoryService } from './product-part-history.service';
import { ProductPartHistoryController } from './product-part-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductPartHistoryEntity } from './product-part-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductPartHistoryEntity])],
  controllers: [ProductPartHistoryController],
  providers: [ProductPartHistoryService],
})
export class ProductPartHistoryModule {}
