import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from './entity/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  async findAll(): Promise<ClientEntity[]> {
    try {
      return await this.clientRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<ClientEntity> {
    try {
      return await this.clientRepository.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async findOneByName(name: string): Promise<ClientEntity> {
    try {
      return await this.clientRepository.findOne({ where: { name } });
    } catch (error) {
      throw error;
    }
  }

  async create(createClientDto: CreateClientDto): Promise<ClientEntity | void> {
    try {
      const client = await this.findOneByName(createClientDto.name);
      if (!client) await this.clientRepository.save(createClientDto);
      return client;
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    updateClientDto: UpdateClientDto,
  ): Promise<ClientEntity | void> {
    try {
      const client = await this.findOne(id);
      if (client) await this.clientRepository.update(id, updateClientDto);
      return client;
    } catch (error) {
      throw error;
    }
  }

  async importClients(clients: CreateClientDto[]): Promise<void> {
    try {
      await this.clientRepository.save(clients);
    } catch (error) {
      throw error;
    }
  }
}
