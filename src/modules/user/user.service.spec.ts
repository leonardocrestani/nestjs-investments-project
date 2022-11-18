import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import {
  createUserMock,
  updateUserMock,
  userMock,
  usersMock,
} from '../../common/mocks/user.mock';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { emptyPositionMock } from '../../common/mocks/position.mock';

describe('UserService', () => {
  let service: UserService;
  let repository: UserRepository;

  const mockRepository = {
    findAll: jest.fn().mockReturnValue([]),
    findOne: jest.fn().mockReturnValue({}),
    create: jest.fn().mockReturnValue(userMock),
    findPosition: jest.fn().mockReturnValue({}),
    update: jest.fn().mockReturnValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<any>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('Create user', () => {
    it('should create a new user', async () => {
      mockRepository.findOne.mockReturnValue(undefined);
      const user = await service.create(createUserMock);
      expect(user).toBe(userMock);
    });
    it('should get error when try to create new user with same account', async () => {
      mockRepository.findOne.mockReturnValue(userMock);
      createUserMock.cpf = '66424912207';
      await service
        .create(createUserMock)
        .catch((error) =>
          expect(error).toEqual(new BadRequestException('User already exists')),
        );
    });
    it('should get error when try to create new user with same CPF', async () => {
      userMock.account = '654321';
      mockRepository.findOne.mockReturnValue(userMock);
      await service
        .create(createUserMock)
        .catch((error) =>
          expect(error).toEqual(new BadRequestException('User already exists')),
        );
    });
    it('should get error when try to create new user with invalid CPF', async () => {
      mockRepository.findOne.mockReturnValue(undefined);
      createUserMock.cpf = '22222222222';
      await service
        .create(createUserMock)
        .catch((error) =>
          expect(error).toStrictEqual(new ForbiddenException('Invalid CPF')),
        );
    });
    it('should get error when try to create new user with invalid account number', async () => {
      mockRepository.findOne.mockReturnValue(undefined);
      createUserMock.account = '1234';
      createUserMock.cpf = '53926221941';
      await service
        .create(createUserMock)
        .catch((error) =>
          expect(error).toStrictEqual(
            new ForbiddenException('Invalid account number'),
          ),
        );
    });
  });
  describe('Find user', () => {
    it('should find all users', async () => {
      mockRepository.findAll.mockReturnValue(usersMock);
      const users = await service.findAll();
      expect(users.length).toBeGreaterThan(1);
    });
    it('should get user by CPF', async () => {
      mockRepository.findOne.mockReturnValue(userMock);
      const user = await service.findOne(userMock.cpf);
      expect(user).toEqual(userMock);
    });
    it('should get error when try to find user with unexistent CPF', async () => {
      userMock.cpf = '19213656688';
      await service
        .findOne(userMock.cpf)
        .catch((error) =>
          expect(error).toEqual(new NotFoundException('User not found')),
        );
    });
  });
  describe('Find position', () => {
    it('should user position by CPF', async () => {
      mockRepository.findPosition.mockReturnValue(emptyPositionMock);
      const position = await service.findPosition({ cpf: userMock.cpf });
      expect(position).toBe(emptyPositionMock);
    });
  });
  describe('Update user', () => {
    it('should update user', async () => {
      mockRepository.update.mockReturnValue(updateUserMock);
      const user = await service.update({ cpf: userMock.cpf }, updateUserMock);
      expect(user).toBe(updateUserMock);
    });
  });
});
