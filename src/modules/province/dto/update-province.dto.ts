import { PartialType } from '@nestjs/mapped-types';
import { CreateProvinceDto } from './create-province.dto';
export class UpdateProductDto extends PartialType(CreateProvinceDto) {
  isActive?: boolean;
}
