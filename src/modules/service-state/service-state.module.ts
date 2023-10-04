import { Module } from '@nestjs/common';
import { ServiceStateService } from './service-state.service';
import { ServiceStateController } from './service-state.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceStateEntity } from './service-state.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceStateEntity])],
  controllers: [ServiceStateController],
  providers: [ServiceStateService],
})
export class ServiceStateModule {}
