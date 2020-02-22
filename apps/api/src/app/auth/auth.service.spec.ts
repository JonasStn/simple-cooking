import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { createSpyObject } from '@ngneat/spectator/jest';
import { Model } from 'mongoose';

import { AuthService } from './auth.service';
import { UserInfo } from './interfaces/user-info.interface';

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
});
