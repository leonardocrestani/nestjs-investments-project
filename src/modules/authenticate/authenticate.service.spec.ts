import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { AuthenticateService } from './authenticate.service';
import { userMock } from '../../common/mocks/user.mock';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthenticateService', () => {
  let service: AuthenticateService;

  const mockUserService = {
    findOne: jest.fn().mockReturnValue({}),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue(''),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticateService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    service = module.get<AuthenticateService>(AuthenticateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Authenticate user', () => {
    it('should authenticate user', async () => {
      mockUserService.findOne.mockReturnValue(userMock);
      mockJwtService.sign.mockReturnValue('12345678abcd');
      const auth = await service.login({
        document: '53926221941',
        password: '123456',
      });
      expect(auth).toHaveProperty('user');
      expect(auth).toHaveProperty('access_token');
    });

    it('should get an error when cpf is incorrect', async () => {
      mockUserService.findOne.mockReturnValue(undefined);
      mockJwtService.sign.mockReturnValue('12345678abcd');
      await service
        .login({
          document: '53926221941',
          password: '123456',
        })
        .catch((error) => expect(error).toBeInstanceOf(UnauthorizedException));
    });

    it('should get an error when password is incorrect', async () => {
      mockUserService.findOne.mockReturnValue(userMock);
      mockJwtService.sign.mockReturnValue('12345678abcd');
      await service
        .login({
          document: '53926221941',
          password: '123456aaaa',
        })
        .catch((error) => expect(error).toBeInstanceOf(UnauthorizedException));
    });
  });
});
