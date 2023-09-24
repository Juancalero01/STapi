import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @Length(1, 60, { message: 'Name must be between 1 and 60 characters' })
  name: string;

  @IsOptional({ message: 'Cuit is optional' })
  @IsString({ message: 'Cuit must be a string' })
  @Length(11, 13, { message: 'Cuit must be between 11 and 13 characters' })
  cuit?: string;

  @IsOptional({ message: 'Contact is optional' })
  @IsString({ message: 'Contact must be a string' })
  @Length(3, 120, { message: 'Contact must be between 3 and 120 characters' })
  contact?: string;

  @IsOptional({ message: 'Email is optional' })
  @IsEmail({ require_tld: true }, { message: 'Email is not valid' })
  @Length(120)
  email?: string;

  @IsOptional({ message: 'Phone is optional' })
  @IsString({ message: 'Phone must be a string' })
  @Length(10, 20, { message: 'Phone must be between 10 and 20 characters' })
  phone?: string;
}
