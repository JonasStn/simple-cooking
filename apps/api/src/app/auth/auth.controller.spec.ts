import { Test, TestingModule } from '@nestjs/testing';
import { createSpyObject, SpyObject } from '@ngneat/spectator/jest';
import { UserInfoDTO } from '@simple-cooking/api-interfaces';
import { Request, Response } from 'express';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserInfo } from './interfaces/user-info.interface';

describe('Auth Controller', () => {
  let controller: AuthController;
  let authService: SpyObject<AuthService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: createSpyObject(AuthService)
        }
      ]
    }).compile();
    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService) as SpyObject<AuthService>;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should redirect with token', () => {
    const res = { redirect: jest.fn() };
    const jwt = 'token';
    const req = { user: { jwt } };

    controller.googleLoginCallback(
      req as Request & { user: { jwt: string } },
      (res as unknown) as Response
    );
    expect(res.redirect).toHaveBeenCalledWith(
      `http://localhost:4200/login?_token=${jwt}`
    );
  });

  it('should redirect to login/failure', () => {
    const res = { redirect: jest.fn() };
    const jwt = null;
    const req = { user: { jwt } };

    controller.googleLoginCallback(
      req as Request & { user: { jwt: string } },
      (res as unknown) as Response
    );
    expect(res.redirect).toHaveBeenCalledWith(
      'http://localhost:4200/login/failure'
    );
  });

  it('should fetch user', async () => {
    const expected: UserInfoDTO = {
      familyName: 'Doe',
      givenName: 'John',
      pictureUrl: 'www.some-picture.url',
      userId: '123'
    };
    authService.findOne.mockReturnValue(
      new Promise((resolve, reject) => resolve(expected as UserInfo))
    );
    const user = await controller.fetchUser('123');
    expect(authService.findOne).toHaveBeenCalledWith('123');
    expect(user).toEqual(expected);
  });
});
