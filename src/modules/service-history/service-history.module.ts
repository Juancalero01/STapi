import { Module } from '@nestjs/common';
import { ServiceHistoryService } from './service-history.service';
import { ServiceHistoryController } from './service-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceHistoryEntity } from './service-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceHistoryEntity])],
  controllers: [ServiceHistoryController],
  providers: [ServiceHistoryService],
})
export class ServiceHistoryModule {}
