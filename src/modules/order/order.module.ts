import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { UserModule } from '../user/user.module';
import { TrendsModule } from '../trends/trends.module';
import { UserService } from '../user/user.service';
import { TrendsService } from '../trends/trends.service';

@Module({
  imports: [TrendsModule, UserModule],
  controllers: [OrderController],
  providers: [OrderService, UserService, TrendsService],
})
export class OrderModule {}
