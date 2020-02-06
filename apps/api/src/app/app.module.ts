import { environment } from '@api/env/environment';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'simple-cooking-web')
    }),
    MongooseModule.forRoot(
      process.env.PROD_MONGODB || environment.DEV_MONGODB,
      { useNewUrlParser: true, useUnifiedTopology: true }
    ),
    AuthModule
  ]
})
export class AppModule {}
