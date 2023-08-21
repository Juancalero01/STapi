import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';
import { StateEnum } from 'src/shared/enums/state.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateClientDto extends PartialType(CreateClientDto) {
  @IsOptional({ message: 'State is optional' })
  @IsEnum(StateEnum, { message: 'State must be a valid enum value' })
  state?: StateEnum;
}
