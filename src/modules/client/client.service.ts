import { HttpException, Injectable } from '@nestjs/common';
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
      return await this.clientRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<ClientEntity> {
    try {
      return await this.clientRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOneTaxpayerName(taxpayerName: string): Promise<ClientEntity> {
    try {
      return await this.clientRepository.findOne({ where: { taxpayerName } });
    } catch (error) {
      throw error;
    }
  }

  async create(body: CreateClientDto): Promise<void> {
    try {
      if (await this.findOneTaxpayerName(body.taxpayerName))
        throw new HttpException(
          `Client with taxpayerName: ${body.taxpayerName} already exists`,
          409,
        );
      await this.clientRepository.save(body);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, body: UpdateClientDto): Promise<void> {
    try {
      if (!(await this.findOne(id)))
        throw new HttpException(`Client with id: ${id} not found`, 404);
      const clientFound = await this.findOneTaxpayerName(body.taxpayerName);
      if (clientFound && clientFound.id !== id)
        throw new HttpException(
          `Client with taxpayerName: ${body.taxpayerName} already exists`,
          409,
        );
      await this.clientRepository.update(id, body);
    } catch (error) {
      throw error;
    }
  }
}
