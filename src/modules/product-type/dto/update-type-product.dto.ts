import { PartialType } from '@nestjs/mapped-types';
import { CreateProductTypeDto } from './create-type-product.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { StateEnum } from 'src/shared/enums/state.enum';

export class UpdateProductTypeDto extends PartialType(CreateProductTypeDto) {
  @IsOptional({ message: 'State is optional' })
  @IsEnum(StateEnum, { message: 'State must be a valid enum value' })
  state?: StateEnum;
}
