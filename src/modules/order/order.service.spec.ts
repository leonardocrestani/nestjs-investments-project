import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../user/user.repository';
import { createOrderMock } from './order.mock';
import { OrderService } from './order.service';

describe('OrderService', () => {
  let service: OrderService;
  let repository: UserRepository;

  const mockRepository = {
    findAll: jest.fn().mockReturnValue([]),
    findOne: jest.fn().mockReturnValue({}),
    create: jest.fn().mockReturnValue({}),
    findPosition: jest.fn().mockReturnValue({}),
    update: jest.fn().mockReturnValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: UserRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    repository = module.get<any>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('Create order', () => {
    it('should create order', async () => {
      const order = await service.order('PETR4', createOrderMock);
      expect(order).toBe(createOrderMock);
    });
    it('should get error when try to create order with unexistent trend', async () => {
      await service
        .order('TESTE1', createOrderMock)
        .catch((error) =>
          expect(error).toEqual(new NotFoundException('Invalid trend')),
        );
    });
    it('should get error when try to create order with insuficient funds', async () => {
      createOrderMock.amount = 45;
      await service
        .order('PETR4', createOrderMock)
        .catch((error) =>
          expect(error).toEqual(new NotFoundException('Insuficient funds')),
        );
    });
  });
});
