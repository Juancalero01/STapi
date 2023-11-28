import { RoleEntity } from 'src/modules/role/role.entity';

export class CreateUserDto {
  fullname: string;
  username: string;
  email: string;
  password: string;
  role: RoleEntity;
}
