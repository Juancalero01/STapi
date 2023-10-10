import { PartialType } from '@nestjs/mapped-types';
import { CreateFailureTypeDto } from './create-failure-type.dto';

export class UpdateFailureTypeDto extends PartialType(CreateFailureTypeDto) {
  isDeleted?: boolean;
}
