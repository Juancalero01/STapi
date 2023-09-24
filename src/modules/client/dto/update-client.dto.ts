import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateClientDto extends PartialType(CreateClientDto) {
  @IsOptional({ message: 'State is optional' })
  @IsBoolean({ message: 'State must be a boolean' })
  state?: boolean;
}
