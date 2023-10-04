import { Module } from '@nestjs/common';
import { ServicePriorityService } from './service-priority.service';
import { ServicePriorityController } from './service-priority.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicePriorityEntity } from './service-priority.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServicePriorityEntity])],
  controllers: [ServicePriorityController],
  providers: [ServicePriorityService],
})
export class ServicePriorityModule {}
