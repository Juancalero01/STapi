import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from './service.entity';
import { FailureTypeModule } from '../failure-type/failure-type.module';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceEntity]), FailureTypeModule],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
