import { UserInfoDTO } from '@simple-cooking/api-interfaces';

import { initialState, State } from './auth.reducer';
import * as AuthSelectors from './auth.selectors';

interface TestState {
  auth: State;
}

const user: UserInfoDTO = {
  givenName: 'John',
  familyName: 'Doe',
  pictureUrl: 'www.image.url',
  userId: '123'
};
const ERROR_MSG = 'No Error Available';

describe('Auth Selectors', () => {
  let state: TestState;

  beforeEach(() => {
    state = {
      auth: {
        ...initialState,
        authError: ERROR_MSG,
        loginSuccess: true,
        currentUser: user,
        currentUserLoading: true
      }
    };
  });

  describe('Auth Selectors', () => {
    it('getAuthError() should return ERROR_MSG', () => {
      const result = AuthSelectors.getAuthError(state);
      expect(result).toBe(ERROR_MSG);
    });

    it('getLoginSuccess() should return true', () => {
      const result = AuthSelectors.getLoginSuccess(state);
      expect(result).toBe(true);
    });

    it('getUserLoading() should return true', () => {
      const result = AuthSelectors.getUserLoading(state);
      expect(result).toBe(true);
    });

    it('getUser() should return testUser', () => {
      const result = AuthSelectors.getUser(state);
      expect(result).toEqual(user);
    });
  });
});
