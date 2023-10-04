import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from './client.entity';
import { UpdateClientDto } from './dto/update-client.dto';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  async findAll(): Promise<ClientEntity[]> {
    try {
      return await this.clientRepository.find({
        relations: ['taxCondition', 'province'],
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<ClientEntity> {
    try {
      return await this.clientRepository.findOne({
        where: { id },
        relations: ['taxCondition', 'province'],
      });
    } catch (error) {
      throw error;
    }
  }

  async findOneByTaxpayerName(taxpayerName: string): Promise<ClientEntity> {
    try {
      return await this.clientRepository.findOne({ where: { taxpayerName } });
    } catch (error) {
      throw error;
    }
  }

  async create(body: CreateClientDto): Promise<ClientEntity | void> {
    try {
      const client = await this.findOneByTaxpayerName(body.taxpayerName);
      if (!client) await this.clientRepository.save(body);
      return client;
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    body: UpdateClientDto,
  ): Promise<ClientEntity | void> {
    try {
      const client = await this.findOne(id);
      if (client) await this.clientRepository.update(id, body);
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
