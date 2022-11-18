import { NotFoundException } from '@nestjs/common';
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
  let service: OrderService;

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

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create order', () => {
    it('should create order', async () => {
      mockTrendService.findOne.mockReturnValue(trendMock);
      mockUserService.findPosition.mockReturnValue(emptyPositionMock);
      mockUserService.update.mockReturnValue(positionMock);
      const order = await service.order(userMock.cpf, createOrderMock);
      expect(order).toBe(positionMock);
    });
    it('should get error when try to create order with unexistent trend', async () => {
      mockTrendService.findOne.mockReturnValue(undefined);
      await service
        .order('PETR4', createOrderMock)
        .catch((error) =>
          expect(error).toEqual(new NotFoundException('Invalid trend')),
        );
    });
    it('should get error when try to create order with insuficient funds', async () => {
      mockTrendService.findOne.mockReturnValue(trendMock);
      mockUserService.findOne.mockReturnValue(emptyPositionMock);
      createOrderMock.amount = 100;
      await service
        .order('PETR4', createOrderMock)
        .catch((error) =>
          expect(error).toEqual(new NotFoundException('Insuficient funds')),
        );
    });
  });
});
