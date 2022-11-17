import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { trendMock, updateTrendMock } from './trend.mock';
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrendsService,
        {
          provide: TrendsRepository,
          useValue: mockRepository,
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
      const trendUpdated = await service.update('PETR4', updateTrendMock);
      expect(trendUpdated).toBe(updateTrendMock);
    });
    it('should get error when try to updated unexistent trend', async () => {
      await service
        .update('TESTE', updateTrendMock)
        .catch((error) =>
          expect(error).toEqual(new NotFoundException('Trend nao encontrada')),
        );
    });
  });
  describe('Find trend', () => {
    it('should find all trends', async () => {
      const trends = await service.findAll();
      expect(trends).toBeGreaterThan(0);
    });
    it('should find trend by symbol', async () => {
      const trend = await service.findOne('PETR4');
      expect(trend).toBe(trendMock);
    });
  });
});
