import { Controller, Post, Body, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  order(@Body() data: CreateOrderDto, @Req() req) {
    return this.orderService.order(req.headers.document, data);
  }
}
