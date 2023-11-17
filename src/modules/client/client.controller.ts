import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientEntity } from './client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { JwtGuard } from '../auth/jwt/jwt.guard';

@UseGuards(JwtGuard)
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get('/')
  async findAll(): Promise<ClientEntity[]> {
    try {
      return await this.clientService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ClientEntity> {
    try {
      return await this.clientService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Post('/')
  async create(@Body() body: CreateClientDto): Promise<void> {
    try {
      await this.clientService.create(body);
    } catch (error) {
      throw error;
    }
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<void> {
    try {
      await this.clientService.update(id, updateClientDto);
    } catch (error) {
      throw error;
    }
  }
}
