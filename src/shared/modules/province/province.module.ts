import { Module } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { ProvinceController } from './province.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvinceEntity } from './province.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProvinceEntity])],
  controllers: [ProvinceController],
  providers: [ProvinceService],
})
export class ProvinceModule {}
