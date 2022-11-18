import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { usersMock } from '../../common/mocks/user.mock';
import { UserService } from '../user/user.service';
import {
  trendsMock,
  trendMock,
  updateTrendMock,
} from '../../common/mocks/trend.mock';
import { TrendsRepository } from './trends.repository';
import { TrendsService } from './trends.service';

describe('TrendsService', () => {
  let service: TrendsService;
  let repository: TrendsRepository;

  const mockRepository = {
    findAll: jest.fn().mockReturnValue([]),
    findOne: jest.fn().mockReturnValue({}),
    update: jest.fn().mockReturnValue({}),
  };

  const mockUserService = {
    findOne: jest.fn().mockReturnValue({}),
    update: jest.fn().mockReturnValue(undefined),
    findAll: jest.fn().mockReturnValue([]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrendsService,
        {
          provide: TrendsRepository,
          useValue: mockRepository,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    service = module.get<TrendsService>(TrendsService);
    repository = module.get<any>(TrendsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('Update trend', () => {
    it('should update trend value', async () => {
      mockRepository.findOne.mockReturnValue(trendMock);
      mockRepository.update.mockReturnValue(updateTrendMock);
      const trendUpdated = await service.update('PETR4', updateTrendMock);
      expect(trendUpdated.currentPrice).toBe(updateTrendMock.currentPrice);
    });
    it('should update trend value on user positions', async () => {
      mockRepository.findOne.mockReturnValue(trendMock);
      mockUserService.findAll.mockReturnValue(usersMock);
      mockRepository.update.mockReturnValue(updateTrendMock);
      const trendUpdated = await service.update('PETR4', updateTrendMock);
      expect(trendUpdated.currentPrice).toBe(updateTrendMock.currentPrice);
    });
    it('should get error when try to updated unexistent trend', async () => {
      mockRepository.findOne.mockReturnValue(undefined);
      await service
        .update('PETR4', updateTrendMock)
        .catch((error) =>
          expect(error).toEqual(new NotFoundException('Trend not found')),
        );
    });
  });
  describe('Find trend', () => {
    it('should find all trends', async () => {
      mockRepository.findAll.mockReturnValue(trendsMock);
      const trends = await service.findAll();
      expect(trends.length).toBeGreaterThan(1);
    });
    it('should find trend by symbol', async () => {
      mockRepository.findOne.mockReturnValue(trendMock);
      const trend = await service.findOne('PETR4');
      expect(trend).toBe(trendMock);
    });
  });
});
