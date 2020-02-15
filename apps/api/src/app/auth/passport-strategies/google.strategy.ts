import { environment } from '@api/env/environment';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';

import { AuthService, Provider } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID || environment.GOOGLE_CLIENT_ID,
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET || environment.GOOGLE_CLIENT_SECRET,
      callbackURL: `${
        environment.production ? environment.HOST : 'http://mylocal.com:3333'
      }/api/auth/google/callback`,
      passReqToCallback: true,
      scope: ['profile']
    });
  }

  async validate(
    _request: Request,
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: Function
  ) {
    try {
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
