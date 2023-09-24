import { Module } from '@nestjs/common';
import { TaxConditionService } from './tax-condition.service';
import { TaxConditionController } from './tax-condition.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxConditionEntity } from './tax-condition.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaxConditionEntity])],
  controllers: [TaxConditionController],
  providers: [TaxConditionService],
})
export class TaxConditionModule {}
