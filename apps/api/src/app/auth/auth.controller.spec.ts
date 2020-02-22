import { Test, TestingModule } from '@nestjs/testing';
import { createSpyObject, SpyObject } from '@ngneat/spectator/jest';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

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
});
