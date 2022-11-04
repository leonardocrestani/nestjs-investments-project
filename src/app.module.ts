import { Module } from '@nestjs/common';
import { TrendsModule } from './modules/trends/trends.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { PositionModule } from './modules/position/position.module';
import { OrderModule } from './modules/order/order.module';
import { TransactionsModule } from './modules/transactions/transactions.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://root:admin@cluster0.caihk.mongodb.net/Investments?retryWrites=true&w=majority',
    ),
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
