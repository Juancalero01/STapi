import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from './modules/client/client.module';
import { ProductModule } from './modules/product/product.module';
import { ProductTypeModule } from './modules/product-type/product-type.module';
import { ProvinceModule } from './modules/province/province.module';
import { TaxConditionModule } from './modules/tax-condition/tax-condition.module';
import { ServiceStateModule } from './modules/service-state/service-state.module';
import { ServiceModule } from './modules/service/service.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'cnet',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ClientModule,
    ProductModule,
    ProductTypeModule,
    ServiceModule,
    // Shared Modules,
    ProvinceModule,
    TaxConditionModule,
    ServiceStateModule,
  ],
})
export class AppModule {}
