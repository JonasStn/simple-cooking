import { environment } from '@api/env/environment';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserInfoDTO } from '@simple-cooking/api-interfaces';
import { sign } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { Profile } from 'passport-google-oauth20';

import { UserInfo } from './interfaces/user-info.interface';

export enum Provider {
  GOOGLE = 'google'
}

@Injectable()
export class AuthService {
  private readonly JWT_SECRET_KEY =
    process.env.JWT_SECRET || environment.JWT_SECRET;

  constructor(
    @InjectModel('UserInfo') private userInfoModel: Model<UserInfo>
  ) {}

  async validateOAuthLogin(
    profile: Profile,
    provider: Provider
  ): Promise<string> {
    try {
      const payload = {
        thirdPartyId: profile.id,
        provider
      };

      const user = await this.findOne(profile.id);

      if (!user) {
        this.createUser({
          userId: profile.id,
          givenName: profile.name.givenName,
          familyName: profile.name.familyName,
          pictureUrl: profile.photos.length > 0 ? profile.photos[0].value : null
        });
      }

      const jwt: string = sign(payload, this.JWT_SECRET_KEY, {
        expiresIn: 3600
      });

      return jwt;
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }

  async createUser(userInfoDTO: UserInfoDTO): Promise<UserInfo> {
    const createdUserInfo = new this.userInfoModel(userInfoDTO);
    return createdUserInfo.save();
  }

  async findOne(userId: string): Promise<UserInfo | undefined> {
    return this.userInfoModel.findOne({ userId }).exec();
  }
}
