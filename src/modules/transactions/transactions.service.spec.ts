import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';
import { createTransationMock } from './transaction.mock';
import { TransactionsService } from './transactions.service';

describe('TransactionsService', () => {
  let transactionService: TransactionsService;
  let userService: UserService;
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
        TransactionsService,
        UserService,
        {
          provide: UserRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    transactionService = module.get<TransactionsService>(TransactionsService);
    userService = module.get<UserService>(UserService);
    repository = module.get<any>(UserRepository);
  });

  it('should be defined', () => {
    expect(transactionService).toBeDefined();
    expect(userService).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('Create transaction', () => {
    it('should create a transaction', async () => {
      const user = await userService.create({
        full_name: 'leonardo crestani',
        cpf: '36809397019',
        account: '123443',
      });
      await transactionService.create(createTransationMock);
      expect(user.checkingAccountAmount).toBe(createTransationMock.amount);
    });
    it('should get error when try to make transfer to unexistent user', async () => {
      await transactionService
        .create(createTransationMock)
        .catch((error) =>
          expect(error).toEqual(new NotFoundException('User not found')),
        );
    });
    it('should get error when try to make transfer to incorrect destinatary CPF', async () => {
      await transactionService
        .create(createTransationMock)
        .catch((error) =>
          expect(error).toEqual(new NotFoundException('Incorrect CPF')),
        );
    });
  });
});
