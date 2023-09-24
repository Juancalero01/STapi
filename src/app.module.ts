import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from './modules/client/client.module';
import { ProductModule } from './modules/product/product.module';
import { ProductTypeModule } from './modules/product-type/product-type.module';

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
  ],
})
export class AppModule {}
