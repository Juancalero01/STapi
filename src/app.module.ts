import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from './modules/client/client.module';
import { ProductModule } from './modules/product/product.module';
import { ProductTypeModule } from './modules/product-type/product-type.module';
import { ProvinceModule } from './modules/province/province.module';
import { TaxConditionModule } from './modules/tax-condition/tax-condition.module';
import { ServiceStateModule } from './modules/service-state/service-state.module';
import { ServiceModule } from './modules/service/service.module';
import { ServicePriorityModule } from './modules/service-priority/service-priority.module';
import { FailureTypeModule } from './modules/failure-type/failure-type.module';
import { ServiceHistoryModule } from './modules/service-history/service-history.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { ServiceNoteModule } from './modules/service-note/service-note.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfig } from './config/database.config';
import { ProductPieceModule } from './modules/product-piece/product-piece.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    AuthModule,
    ClientModule,
    ProductModule,
    ProductTypeModule,
    ServiceModule,
    ServiceHistoryModule,
    ServiceNoteModule,
    ServiceStateModule,
    ServicePriorityModule,
    ProvinceModule,
    TaxConditionModule,
    FailureTypeModule,
    UserModule,
    RoleModule,
    ProductPieceModule,
  ],
  providers: [],
})
export class AppModule {}
