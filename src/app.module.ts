import { Module } from '@nestjs/common';
import { TrendsModule } from './modules/trends/trends.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { PositionModule } from './modules/position/position.module';
import { OrderModule } from './modules/order/order.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { config } from './config/config';

@Module({
  imports: [
    MongooseModule.forRoot(config.databaseUrl),
    TrendsModule,
    UserModule,
    PositionModule,
    OrderModule,
    TransactionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
