import { environment } from '@api/env/environment';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

import { AuthService, Provider } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID || environment.GOOGLE_CLIENT_ID,
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET || environment.GOOGLE_CLIENT_SECRET,
      callbackURL: `${environment.HOST}/api/auth/google/callback`,
      passReqToCallback: true,
      scope: ['profile']
    });
  }

  async validate(
    _request: any,
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: Function
  ) {
    try {
      console.log(profile);
      const jwt = await this.authService.validateOAuthLogin(
        profile,
        Provider.GOOGLE
      );
      const user = {
        jwt
      };
      done(null, user);
    } catch (err) {
      console.log(err);
      done(err, false);
    }
  }
}
