import { PartialType } from '@nestjs/mapped-types';
import { CreateTaxConditionDto } from './create-tax-condition.dto';
export class UpdateTaxConditionDto extends PartialType(CreateTaxConditionDto) {
  isActive?: boolean;
}
