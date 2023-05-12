import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { JwtPayload } from './jwt-payload.interface';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

const mockRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findOneBy: jest.fn(),
});

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get('JWT_SECRET'),
            signOptions: {
              expiresIn: 3600,
            },
          }),
        }),
      ],
      providers: [
        AuthService,
        UserService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository(),
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key) => {
              if (key === 'JWT_SECRET') {
                return 'your_secret_key_here';
              }
            }),
          },
        },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    userService = moduleRef.get<UserService>(UserService);
    jwtService = moduleRef.get<JwtService>(JwtService);
  });

  describe('signIn', () => {
    it('should return a token, user and expiresIn if credentials are valid', async () => {
      // Arrange
      const authCredentialsDto = {
        username: 'johndoe',
        password: 'password',
      };

      const user = {
        id: 1,
        username: 'johndoe',
        email: 'johndoe@example.com',
        password:
          '$2b$10$gT7KjZb2QV1q3J28MTfV7uAsj1HceR7.3pOeU6j8U6Pf/Fc.N0cl6', // hashed password for 'password'
        createdAt: new Date(),
        updatedAt: new Date(),
        online: true,
        bio: 'bio',
      };

      jest.spyOn(userService, 'findUserSignIn').mockResolvedValue(user);

      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(true));

      const expiresIn = 3600;
      const token = 'jwt-token';

      jest.spyOn(jwtService, 'sign').mockReturnValue(token);

      // Act
      const result = await authService.signIn({ ...authCredentialsDto, token });

      // Assert
      expect(userService.findUserSignIn).toHaveBeenCalledWith('johndoe');
      expect(bcrypt.compare).toHaveBeenCalledWith('password', user.password);
      expect(jwtService.sign).toHaveBeenCalledWith(
        { username: 'johndoe', expiration: expect.any(Date) },
        { expiresIn },
      );
      expect(result).toEqual({ token, user, expiresIn });
    });

    it('should throw UnauthorizedException if credentials are invalid', async () => {
      // Arrange
      const authCredentialsDto = {
        username: 'johndoe',
        password: 'password',
      };

      const user = {
        id: 1,
        username: 'johndoe',
        email: 'johndoe@example.com',
        password:
          '$2b$10$gT7KjZb2QV1q3J28MTfV7uAsj1HceR7.3pOeU6j8U6Pf/Fc.N0cl6', // hashed password for 'password'
        createdAt: new Date(),
        updatedAt: new Date(),
        online: true,
        bio: 'bio',
      };
      const token = 'jwt-token';

      jest.spyOn(userService, 'findUserSignIn').mockResolvedValue(user);

      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(false));

      // Act and Assert
      expect(
        authService.signIn({ ...authCredentialsDto, token }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('validateUser', () => {
    it('should return the user if the password is valid', async () => {
      // Arrange
      const mockUser = new User();
      mockUser.username = 'testuser';
      mockUser.password = await bcrypt.hash('testpassword', 10);

      jest.spyOn(userService, 'findUserSignIn').mockResolvedValue(mockUser);

      // Act
      const result = await authService.validateUser('testuser', 'testpassword');

      // Assert
      expect(result).toEqual({ username: 'testuser' });
    });

    it('should return null if the user is not found', async () => {
      // Arrange
      jest.spyOn(userService, 'findUserSignIn').mockResolvedValue(null);

      // Act
      const result = await authService.validateUser('testuser', 'testpassword');

      // Assert
      expect(result).toBeNull();
    });

    it('should return null if the password is invalid', async () => {
      // Arrange
      const mockUser = new User();
      mockUser.username = 'testuser';
      mockUser.password = await bcrypt.hash('testpassword', 10);

      jest.spyOn(userService, 'findUserSignIn').mockResolvedValue(mockUser);

      // Act
      const result = await authService.validateUser(
        'testuser',
        'wrongpassword',
      );

      // Assert
      expect(result).toBeNull();
    });
  });

  describe('validateJwtPayload', () => {
    it('should return undefined if user not found', async () => {
      const payload: JwtPayload = {
        username: 'non-existent-user',
        expiration: new Date(),
      };
      jest
        .spyOn(userService, 'findUserSignIn')
        .mockResolvedValueOnce(undefined);
      const result = await authService.validateJwtPayload(payload);
      expect(result).toBeUndefined();
    });

    it('should return undefined if user is disabled', async () => {
      const payload: JwtPayload = {
        username: 'disabled-user',
        expiration: new Date(),
      };
      const disabledUser = {
        username: 'disabled-user',
        password: 'password',
        online: false,
      };
      jest
        .spyOn(userService, 'findUserSignIn')
        .mockResolvedValueOnce(disabledUser as User);
      const result = await authService.validateJwtPayload(payload);
      expect(result).toBeUndefined();
    });

    it('should return the user if user is found and online', async () => {
      const payload: JwtPayload = {
        username: 'valid-user',
        expiration: new Date(),
      };
      const validUser = {
        username: 'valid-user',
        password: 'password',
        online: true,
      };
      jest
        .spyOn(userService, 'findUserSignIn')
        .mockResolvedValueOnce(validUser as User);
      const result = await authService.validateJwtPayload(payload);
      expect(result).toEqual(validUser);
    });
  });

  describe('createJwt', () => {
    it('should return a token and data with the correct username and expiration', async () => {
      // Arrange
      const user: User = {
        id: 1,
        username: 'testuser',
        password: 'testpassword',
        email: 'testuser@example.com',
        online: true,
        bio: 'bio',
      };
      const expectedExpiration = new Date();
      expectedExpiration.setTime(expectedExpiration.getTime() + 3600 * 1000);
      const expectedData: JwtPayload = {
        username: 'testuser',
        expiration: expectedExpiration,
      };

      // Act
      const result = await authService.createJwt(user);

      // Assert
      expect(result.token).toBeDefined();
      expect(result.data).toEqual(expectedData);
    });
  });
});
