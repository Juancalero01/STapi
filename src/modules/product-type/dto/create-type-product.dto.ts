import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateProductTypeDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @Length(3, 60, { message: 'Name must be between 3 and 60 characters' })
  name: string;

  @IsNotEmpty({ message: 'Prefix is required' })
  @IsString({ message: 'Prefix must be a string' })
  @MaxLength(4, { message: 'Prefix must be 4 characters' })
  prefix: string;

  @IsOptional({ message: 'Description is optional' })
  @IsString({ message: 'Description must be a string' })
  @Length(3, 120, {
    message: 'Description must be between 3 and 120 characters',
  })
  description?: string;
}
