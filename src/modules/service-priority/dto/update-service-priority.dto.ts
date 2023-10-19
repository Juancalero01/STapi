import { PartialType } from '@nestjs/mapped-types';
import { CreateServicePriorityDto } from './create-service-priority.dto';

export class UpdateServicePriorityDto extends PartialType(
  CreateServicePriorityDto,
) {
  isActive?: boolean;
}
