import { Injectable } from '@nestjs/common';
import { CreateServiceNoteDto } from './dto/create-service-note.dto';
import { UpdateServiceNoteDto } from './dto/update-service-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceNoteEntity } from './service-note.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceNoteService {
  constructor(
    @InjectRepository(ServiceNoteEntity)
    private readonly serviceNoteRepository: Repository<ServiceNoteEntity>,
  ) {}

  async findAll(): Promise<ServiceNoteEntity[]> {
    try {
      return await this.serviceNoteRepository.find({
        relations: ['user', 'state'],
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<ServiceNoteEntity> {
    try {
      return await this.serviceNoteRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  async findByServiceHistory(id: number): Promise<ServiceNoteEntity[]> {
    try {
      return await this.serviceNoteRepository.find({
        where: {
          serviceHistory: {
            id,
          },
        },
        relations: ['user', 'state'],
      });
    } catch (error) {
      throw error;
    }
  }

  async create(body: CreateServiceNoteDto): Promise<void> {
    try {
      await this.serviceNoteRepository.save(body);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, body: UpdateServiceNoteDto) {
    try {
      await this.serviceNoteRepository.update(id, body);
    } catch (error) {
      throw error;
    }
  }
}
