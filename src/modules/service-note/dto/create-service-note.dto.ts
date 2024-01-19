import { ServiceStateEntity } from 'src/modules/service-state/service-state.entity';
import { UserEntity } from 'src/modules/user/user.entity';

export class CreateServiceNoteDto {
  dateEntry: Date;
  comment: string;
  user: UserEntity;
  state: ServiceStateEntity;
}
