import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

import { environment } from '../../environments/environment';

export enum Provider {
  GOOGLE = 'google'
}

@Injectable()
export class AuthService {
  private readonly JWT_SECRET_KEY = process.env.JWT_SECRET || environment.JWT_SECRET;

  // TODO add registration code here

  async validateOAuthLogin(
    profile: any,
    provider: Provider
  ): Promise<string> {
    const payload = {
      thirdPartyId: profile.id,
      provider
    };

    const jwt: string = sign(payload, this.JWT_SECRET_KEY, { expiresIn: 3600 });
    return jwt;
  }
  catch(err) {
    throw new InternalServerErrorException('validateOAuthLogin', err.message);
  }
}
