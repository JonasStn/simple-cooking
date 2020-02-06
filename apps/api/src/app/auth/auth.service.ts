import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { Profile } from 'passport-google-oauth20';

import { environment } from '../../environments/environment';

export enum Provider {
  GOOGLE = 'google'
}

@Injectable()
export class AuthService {
  private readonly JWT_SECRET_KEY =
    process.env.JWT_SECRET || environment.JWT_SECRET;

  async validateOAuthLogin(
    profile: Profile,
    provider: Provider
  ): Promise<string> {
    try {
      const payload = {
        thirdPartyId: profile.id,
        provider
      };

      // TODO add registration code here

      const jwt: string = sign(payload, this.JWT_SECRET_KEY, {
        expiresIn: 3600
      });
      return jwt;
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }
}
