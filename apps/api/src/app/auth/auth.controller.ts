import { environment } from '@api/env/environment';
import { Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserInfoDTO } from '@simple-cooking/api-interfaces';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    // initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(
    @Req() req: Request & { user: { jwt: string } },
    @Res() res: Response
  ) {
    // handles the Google OAuth2 callback
    const jwt: string = req.user.jwt;
    if (jwt)
      res.redirect(
        `${
          environment.production ? environment.HOST : 'http://localhost:4200'
        }/login?_token=${jwt}`
      );
    else
      res.redirect(
        `${
          environment.production ? environment.HOST : 'http://localhost:4200'
        }/login/failure`
      );
  }

  // Sample protected endpoint
  @Get('user/:id')
  @UseGuards(AuthGuard('jwt'))
  async fetchUser(@Param('id') id: string): Promise<UserInfoDTO> {
    const user = await this.authService.findOne(id);
    return user;
  }
}
