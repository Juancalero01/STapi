import { Module } from '@nestjs/common';
import { FailureTypeService } from './failure-type.service';
import { FailureTypeController } from './failure-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FailureTypeEntity } from './failure-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FailureTypeEntity])],
  controllers: [FailureTypeController],
  providers: [FailureTypeService],
  exports: [FailureTypeService],
})
export class FailureTypeModule {}
