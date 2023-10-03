import { ProvinceEntity } from 'src/modules/province/province.entity';
import { TaxConditionEntity } from 'src/modules/tax-condition/tax-condition.entity';

export class CreateClientDto {
  taxpayerName: string;
  taxpayerId?: string;
  taxCondition?: TaxConditionEntity;
  taxpayerEmail?: string;
  taxpayerPhone?: string;
  province?: ProvinceEntity;
  street?: string;
  number?: string;
  floor?: string;
  office?: string;
  postalCode?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  comment?: string;
}
