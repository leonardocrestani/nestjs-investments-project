import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { createTransationMock } from '../../common/mocks/transaction.mock';
import { TransactionsService } from './transactions.service';
import { userMock } from '../../common/mocks/user.mock';

describe('TransactionsService', () => {
  let transactionService: TransactionsService;

  const mockUserService = {
    findOne: jest.fn().mockReturnValue({}),
    update: jest.fn().mockReturnValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    transactionService = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(transactionService).toBeDefined();
  });

  describe('Create transaction', () => {
    it('should create a transaction', async () => {
      mockUserService.findOne.mockReturnValue(userMock);
      expect(
        transactionService.create(createTransationMock),
      ).resolves.not.toThrowError();
    });
    it('should get error when try to make transfer to unexistent user', async () => {
      mockUserService.findOne.mockReturnValue(undefined);
      await transactionService
        .create(createTransationMock)
        .catch((error) =>
          expect(error).toEqual(new NotFoundException('User not found')),
        );
    });
    it('should get error when try to make transfer to incorrect destinatary CPF', async () => {
      mockUserService.findOne.mockReturnValue(userMock);
      createTransationMock.origin.cpf = '09638485000';
      await transactionService
        .create(createTransationMock)
        .catch((error) =>
          expect(error).toEqual(new ForbiddenException('Incorrect CPF')),
        );
    });
  });
});
