import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { StateEnum } from 'src/shared/enums/state.enum';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional({ message: 'State is optional' })
  @IsEnum(StateEnum, { message: 'State must be a valid enum value' })
  state?: StateEnum;
}
