import { ProductPartEntity } from 'src/modules/product-part/product-part.entity';

export class CreateProductPartHistoryDto {
  dateEntry: Date;
  currentSerial: string;
  nextSerial: string;
  remarks: string;
  productPart: ProductPartEntity;
}
