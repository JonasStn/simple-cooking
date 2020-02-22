import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';
import { UserInfoDTO } from '@simple-cooking/api-interfaces';

import * as AuthActions from './auth.actions';
import { AuthFacade } from './auth.facade';
import { AUTH_FEATURE_KEY, reducer, State } from './auth.reducer';

interface TestSchema {
  auth: State;
}

describe('AuthFacade', () => {
  let facade: AuthFacade;
  let store: Store<TestSchema>;

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(AUTH_FEATURE_KEY, reducer),
          EffectsModule.forFeature([])
        ],
        providers: [AuthFacade]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot(
            {},
            {
              runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true
              }
            }
          ),
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(AuthFacade);
    });

    it('should select properties', async done => {
      try {
        let authError = await readFirst(facade.authError$);
        let loginSuccess = await readFirst(facade.loginSuccess$);
        let user = await readFirst(facade.user$);
        let userLoading = await readFirst(facade.userLoading$);

        expect(authError).toBe(null);
        expect(loginSuccess).toBe(false);
        expect(user).toBe(null);
        expect(userLoading).toBe(false);

        store.dispatch(AuthActions.loadUserError({ error: 'user error' }));
        authError = await readFirst(facade.authError$);
        expect(authError).toBe('user error');

        store.dispatch(AuthActions.loginFlowSuccess());
        loginSuccess = await readFirst(facade.loginSuccess$);
        expect(loginSuccess).toBe(true);

        const userMock: UserInfoDTO = {
          givenName: 'John',
          familyName: 'Doe',
          pictureUrl: 'www.image.url',
          userId: '123'
        };

        store.dispatch(AuthActions.loadUserSuccess({ user: userMock }));
        user = await readFirst(facade.user$);
        expect(user).toBe(userMock);

        store.dispatch(AuthActions.loadUser());
        userLoading = await readFirst(facade.userLoading$);
        expect(userLoading).toBe(true);

        done();
      } catch (err) {
        done(err);
      }
    });

    it('should dispatch loadUser action', () => {
      store.dispatch = jest.fn();
      facade.loadUser();
      expect(store.dispatch).toHaveBeenCalledWith(AuthActions.loadUser());
    });
  });
});
