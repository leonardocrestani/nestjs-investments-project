import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { UserModule } from '../user/user.module';
import { TrendsModule } from '../trends/trends.module';

@Module({
  imports: [TrendsModule, UserModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
