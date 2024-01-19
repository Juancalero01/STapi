import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceNoteDto } from './create-service-note.dto';

export class UpdateServiceNoteDto extends PartialType(CreateServiceNoteDto) {
  isActive?: boolean;
}
