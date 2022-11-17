import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';
import { positionMock } from './position.mock';
import { PositionService } from './position.service';

describe('PositionService', () => {
  let positionService: PositionService;
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
        PositionService,
        {
          provide: UserRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    positionService = module.get<PositionService>(PositionService);
    repository = module.get<any>(UserRepository);
  });

  it('should be defined', () => {
    expect(positionService).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('Find position', () => {
    it('should find user position', async () => {
      const position = await positionService.findOne(positionMock);
      expect(position).toBe(positionMock);
    });
    it('should get error when try to find position with invalid CPF', async () => {
      await positionService
        .findOne('47238648534')
        .catch((error) =>
          expect(error).toEqual(new NotFoundException('CPF invalido')),
        );
    });
  });
});
