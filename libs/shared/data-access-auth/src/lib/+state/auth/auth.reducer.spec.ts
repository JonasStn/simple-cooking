import { UserInfoDTO } from '@simple-cooking/api-interfaces';

import * as AuthActions from './auth.actions';
import { initialState, reducer } from './auth.reducer';

describe('Auth Reducer', () => {
  beforeEach(() => {});

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;
      const result = reducer(initialState, action);
      expect(result).toEqual(initialState);
    });
  });

  describe('loginFlowSuccess action', () => {
    it('should set loginSuccess to true', () => {
      const action = AuthActions.loginFlowSuccess();
      const result = reducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        loginSuccess: true
      });
    });
  });

  describe('loginFlowError action', () => {
    it('should should set authError and loginSuccess to false', () => {
      const action = AuthActions.loginFlowError({ error: 'error' });
      const result = reducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        authError: action.error
      });
    });
  });

  describe('loadUser action', () => {
    it('should should set currentUserLoading to true', () => {
      const action = AuthActions.loadUser();
      const result = reducer(initialState, action);
      expect(result).toEqual({ ...initialState, currentUserLoading: true });
    });
  });

  describe('loadUserSuccess action', () => {
    it('should set currentUser', () => {
      const user: UserInfoDTO = {
        givenName: 'John',
        familyName: 'Doe',
        pictureUrl: 'www.image.url',
        userId: '123'
      };
      const action = AuthActions.loadUserSuccess({ user });
      const result = reducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        currentUser: user,
        loginSuccess: true
      });
    });
  });

  describe('loadUserError action', () => {
    it('should set authError', () => {
      const action = AuthActions.loadUserError({ error: 'user not found' });
      const result = reducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        authError: action.error
      });
    });
  });
});
