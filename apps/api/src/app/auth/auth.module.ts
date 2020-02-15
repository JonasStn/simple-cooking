import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './passport-strategies/google.strategy';
import { JwtStrategy } from './passport-strategies/jwt.strategy';
import { UserInfoSchema } from './schemas/user-info.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'UserInfo', schema: UserInfoSchema }])
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, JwtStrategy]
})
export class AuthModule {}
