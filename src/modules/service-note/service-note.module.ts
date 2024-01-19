import { Module } from '@nestjs/common';
import { ServiceNoteService } from './service-note.service';
import { ServiceNoteController } from './service-note.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceNoteEntity } from './service-note.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceNoteEntity])],
  controllers: [ServiceNoteController],
  providers: [ServiceNoteService],
})
export class ServiceNoteModule {}
