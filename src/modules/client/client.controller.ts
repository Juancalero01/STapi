import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientEntity } from './client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get('/')
  async findAll(): Promise<ClientEntity[]> {
    try {
      const clients = await this.clientService.findAll();
      if (!clients.length) throw new HttpException('Clients not found', 404);
      return clients;
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<ClientEntity> {
    try {
      const client = await this.clientService.findOne(id);
      if (!client) throw new HttpException(`Client not found`, 404);
      return client;
    } catch (error) {
      throw error;
    }
  }

  @Post('/')
  async create(@Body() createClientDto: CreateClientDto): Promise<void> {
    try {
      if (await this.clientService.create(createClientDto))
        throw new HttpException('Client already exists', 409);
    } catch (error) {
      throw error;
    }
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<void> {
    try {
      if (!(await this.clientService.update(id, updateClientDto)))
        throw new HttpException(`Client not found`, 404);
    } catch (error) {
      throw error;
    }
  }

  @Post('/import')
  async importClients(
    @Body()
    clients: CreateClientDto[],
  ): Promise<void> {
    try {
      await this.clientService.importClients(clients);
    } catch (error) {
      throw error;
    }
  }
}
