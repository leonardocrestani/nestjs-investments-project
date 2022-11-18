import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { userMock } from '../../common/mocks/user.mock';
import {
  emptyPositionMock,
  positionMock,
} from '../../common/mocks/position.mock';
import { trendMock } from '../../common/mocks/trend.mock';
import { TrendsService } from '../trends/trends.service';
import { UserService } from '../user/user.service';
import { createOrderMock } from '../../common/mocks/order.mock';
import { OrderService } from './order.service';

describe('OrderService', () => {
  let orderService: OrderService;

  const mockUserService = {
    findOne: jest.fn().mockReturnValue({}),
    update: jest.fn().mockReturnValue(undefined),
    findPosition: jest.fn().mockReturnValue({}),
  };

  const mockTrendService = {
    findOne: jest.fn().mockReturnValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: TrendsService,
          useValue: mockTrendService,
        },
      ],
    }).compile();

    orderService = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(orderService).toBeDefined();
  });

  describe('Create order', () => {
    it('should create order', async () => {
      mockTrendService.findOne.mockReturnValue(trendMock);
      mockUserService.findPosition.mockReturnValue(emptyPositionMock);
      mockUserService.update.mockReturnValue(positionMock);
      const order = await orderService.order(userMock.cpf, createOrderMock);
      expect(order).toStrictEqual(positionMock);
    });
    it('should get error', async () => {
      mockTrendService.findOne.mockReturnValue(trendMock);
      mockUserService.findPosition.mockReturnValue(emptyPositionMock);
      mockUserService.update.mockRejectedValue(new Error());
      await orderService
        .order(userMock.cpf, createOrderMock)
        .catch((error) => expect(error).toBeInstanceOf(Error));
    });
    it('should get error when try to create order with unexistent trend', async () => {
      mockTrendService.findOne.mockReturnValue(undefined);
      await orderService
        .order(userMock.cpf, createOrderMock)
        .catch((error) =>
          expect(error).toStrictEqual(new NotFoundException('Invalid trend')),
        );
    });
    it('should get error when try to create order with insuficient funds', async () => {
      mockTrendService.findOne.mockReturnValue(trendMock);
      mockUserService.findOne.mockReturnValue(emptyPositionMock);
      createOrderMock.amount = 100;
      await orderService
        .order(userMock.cpf, createOrderMock)
        .catch((error) =>
          expect(error).toStrictEqual(
            new ForbiddenException('Insuficient funds'),
          ),
        );
    });
  });
});
