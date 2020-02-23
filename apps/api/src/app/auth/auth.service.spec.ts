import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { createSpyObject } from '@ngneat/spectator/jest';
import { Model } from 'mongoose';
import { Profile } from 'passport-google-oauth20';

import { AuthService, Provider } from './auth.service';
import { UserInfo } from './interfaces/user-info.interface';

const profile: Profile = {
  id: '123',
  name: {
    familyName: 'Doe',
    givenName: 'John'
  },
  photos: [{ value: 'www.some-picture.url' }]
} as Profile;

const user = {
  userId: '123',
  givenName: 'John',
  familyName: 'Doe',
  pictureUrl: 'www.some-picture.url'
};

describe('AuthService', () => {
  let service: AuthService;
  let repository: Model<UserInfo>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken('UserInfo'),
          useValue: createSpyObject(Model)
        }
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
    repository = module.get<Model<UserInfo>>(getModelToken('UserInfo'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateOAuthLogin', () => {
    it('should create user', async () => {
      service.findOne = jest.fn(
        () => new Promise((resolve, _reject) => resolve(null))
      );
      service.createUser = jest.fn();
      await service.validateOAuthLogin(profile, Provider.GOOGLE);
      expect(service.createUser).toHaveBeenCalledWith(user);
    });

    it('should not override existing user', async () => {
      service.findOne = jest.fn(
        () => new Promise((resolve, _reject) => resolve(user as UserInfo))
      );
      service.createUser = jest.fn();
      await service.validateOAuthLogin(profile, Provider.GOOGLE);
      expect(service.createUser).not.toHaveBeenCalled();
    });
  });
});
