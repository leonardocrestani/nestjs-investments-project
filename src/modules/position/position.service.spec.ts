import { ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { positionMock } from '../../common/mocks/position.mock';
import { PositionService } from './position.service';

describe('PositionService', () => {
  let positionService: PositionService;

  const mockUserService = {
    findPosition: jest.fn().mockReturnValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PositionService,
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    positionService = module.get<PositionService>(PositionService);
  });

  it('should be defined', () => {
    expect(positionService).toBeDefined();
  });

  describe('Find position', () => {
    it('should find user position with pagination', async () => {
      mockUserService.findPosition.mockReturnValue(positionMock);
      const position = await positionService.findOnePosition(
        '53926221941',
        '3',
        '1',
      );
      expect(position.positions).toStrictEqual(positionMock.positions);
    });
    it('should get error when try to find position with invalid CPF', async () => {
      await positionService
        .findOnePosition('22222222222', '3', '1')
        .catch((error) =>
          expect(error).toStrictEqual(new ForbiddenException('Invalid CPF')),
        );
    });
    it('should get error when try to find position with unexistent client', async () => {
      mockUserService.findPosition.mockReturnValue(undefined);
      await positionService
        .findOnePosition('72047258081', '3', '1')
        .catch((error) =>
          expect(error).toStrictEqual(
            new ForbiddenException('Unexistent client position'),
          ),
        );
    });
  });
});
