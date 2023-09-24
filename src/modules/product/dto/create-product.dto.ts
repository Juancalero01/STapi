import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
} from 'class-validator';
import { ClientEntity } from 'src/modules/client/entity/client.entity';
import { ProductTypeEntity } from 'src/modules/product-type/entity/product-type.entity';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Serial is required' })
  @IsString({ message: 'Serial must be a string' })
  @Length(9, 10, { message: 'Serial must be between 9 and 10 characters' })
  serial: string;

  @IsNotEmpty({ message: 'Reference is required' })
  @IsString({ message: 'Reference must be a string' })
  @Max(50, { message: 'Reference must be less than 50 characters' })
  reference: string;

  @IsNotEmpty({ message: 'Delivery date is required' })
  @IsString({ message: 'Delivery date must be a string' })
  @IsDate({ message: 'Delivery date must be a date' })
  deliveryDate: Date;

  @IsNotEmpty({ message: 'Product type is required' })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'Product type must be a number' },
  )
  productType: ProductTypeEntity;

  @IsNotEmpty({ message: 'Client is required' })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'Client must be a number' },
  )
  client: ClientEntity;
}
