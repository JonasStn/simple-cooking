import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { createSpyObject, SpyObject } from '@ngneat/spectator/jest';
import {
  AuthFacade,
  AuthService
} from '@simple-cooking/shared/data-access-auth';
import { cold, Scheduler } from 'jest-marbles';
import { MockComponent } from 'ng-mocks';

import { LoginFormComponent } from '../components';
import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let authFacade: SpyObject<AuthFacade>;
  let router: SpyObject<Router>;
  let authService: SpyObject<AuthService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPageComponent, MockComponent(LoginFormComponent)],
      providers: [
        { provide: AuthFacade, useValue: createSpyObject(AuthFacade) },
        { provide: Router, useValue: createSpyObject(Router) },
        {
          provide: AuthService,
          useValue: createSpyObject(AuthService)
        }
      ]
    }).compileComponents();
    authService = TestBed.inject(AuthService) as SpyObject<AuthService>;
    authFacade = TestBed.inject(AuthFacade) as SpyObject<AuthFacade>;
    router = TestBed.inject(Router) as SpyObject<Router>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    const obs$ = cold('-x-', { x: true });
    authFacade.loginSuccess$ = obs$;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect on login success', () => {
    authService.getRedirectUrl.mockReturnValue('/redirect');
    Scheduler.instance.flush();
    expect(authFacade.loadUser).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/redirect']);
  });
});
