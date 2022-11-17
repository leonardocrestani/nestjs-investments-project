import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { userMock } from './user.mock';
import { BadRequestException, NotFoundException } from '@nestjs/common';

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
      const userCreated = await service.create(userMock);
      expect(mockRepository.create).toBeCalledWith(
        userMock.account,
        userMock.name,
        userMock.cpf,
        userMock.balance,
      );
      expect(userCreated).toBe(userMock);
    });
    it('should get error when try to create new user with same account', async () => {
      userMock.cpf = '66424912207';
      await service
        .create(userMock)
        .catch((error) =>
          expect(error).toEqual(new BadRequestException('User exist')),
        ); //rever retorno funcao para conta ja existente
    });
    it('should get error when try to create new user with same CPF', async () => {
      userMock.account = '654321';
      await service.create(userMock).catch(
        (error) => expect(error).toEqual(new BadRequestException('User exist')), //rever retorno funcao para conta ja existente
      );
    });
  });
  describe('Find user', () => {
    it('should get user by CPF', async () => {
      const user = await service.findOne(userMock.cpf);
      expect(user).toEqual(userMock); // verificar retorno pois o mock tem menos campos
    });
    it('should get error when try to find user with unexistent CPF', async () => {
      userMock.cpf = '19213656688';
      await service.findOne(userMock.cpf).catch(
        (error) =>
          expect(error).toEqual(new NotFoundException('User not found')), //rever retorno funcao para conta ja existente
      );
    });
  });
});
