import { environment } from '@api/env/environment';
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
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
  @Get('protected')
  @UseGuards(AuthGuard('jwt'))
  protectedResource() {
    return 'JWT is working!';
  }
}
