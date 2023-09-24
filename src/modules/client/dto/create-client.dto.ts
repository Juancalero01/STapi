import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ProvinceEntity } from 'src/shared/modules/province/province.entity';
import { TaxConditionEntity } from 'src/shared/modules/tax-condition/tax-condition.entity';

export class CreateClientDto {
  @IsNotEmpty({ message: 'Taxpayer Name is required' })
  @IsString({ message: 'Taxpayer Name must be a string' })
  @Length(2, 150, {
    message: 'Taxpayer Name must be between 1 and 60 characters',
  })
  taxpayerName: string;

  @IsOptional({ message: 'Taxpayer Id is optional' })
  @IsString({ message: 'Taxpayer Id must be a string' })
  @Length(11, 13, {
    message: 'Taxpayer Id must be between 11 and 13 characters',
  })
  taxpayerId?: string;

  @IsOptional({ message: 'Tax Condition is optional' })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'Tax Condition must be a number' },
  )
  taxCondition?: TaxConditionEntity;

  @IsOptional({ message: 'Taxpayer Email is optional' })
  @IsEmail({ require_tld: true }, { message: 'Email is not valid' })
  @Length(120)
  taxpayerEmail?: string;

  @IsOptional({ message: 'Taxpayer Phone is optional' })
  @IsString({ message: 'Taxpayer Phone must be a string' })
  @Length(10, 20, {
    message: 'Taxpayer Phone must be between 10 and 20 characters',
  })
  taxpayerPhone?: string;

  @IsOptional({ message: 'Province is optional' })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'Province must be a number' },
  )
  province?: ProvinceEntity;

  @IsOptional({ message: 'Street is optional' })
  @IsString({ message: 'Street must be a string' })
  @Length(3, 150, { message: 'Street must be between 3 and 150 characters' })
  street?: string;

  @IsOptional({ message: 'Number is optional' })
  @IsString({ message: 'Number must be a string' })
  @Length(1, 120, { message: 'Number must be between 1 and 120 characters' })
  number?: string;

  @IsOptional({ message: 'Floor is optional' })
  @IsString({ message: 'Floor must be a string' })
  @Length(1, 120, { message: 'Floor must be between 1 and 120 characters' })
  floor?: string;

  @IsOptional({ message: 'Office is optional' })
  @IsString({ message: 'Office must be a string' })
  @Length(1, 50, { message: 'Office must be between 1 and 50 characters' })
  office?: string;

  @IsOptional({ message: 'Postal Code is optional' })
  @IsString({ message: 'Postal Code must be a string' })
  @Length(1, 8, { message: 'Postal Code must be between 1 and 8 characters' })
  postalCode?: string;

  @IsOptional({ message: 'Contact Name is optional' })
  @IsString({ message: 'Contact Name must be a string' })
  @Length(3, 120, {
    message: 'Contact Name must be between 3 and 120 characters',
  })
  contactName?: string;

  @IsOptional({ message: 'Contact Email is optional' })
  @IsEmail({ require_tld: true }, { message: 'Email is not valid' })
  @Length(120)
  contactEmail?: string;

  @IsOptional({ message: 'Contact Phone is optional' })
  @IsString({ message: 'Contact Phone must be a string' })
  @Length(10, 20, {
    message: 'Contact Phone must be between 10 and 20 characters',
  })
  contactPhone?: string;

  @IsOptional({ message: 'Comment is optional' })
  @IsString({ message: 'Comment must be a string' })
  @Length(1, 250, { message: 'Comment must be between 1 and 250 characters' })
  comment?: string;
}
