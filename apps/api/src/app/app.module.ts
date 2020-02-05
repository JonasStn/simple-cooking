import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.dev.env'
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'simple-cooking-web')
    }),
    MongooseModule.forRoot(
      process.env.PROD_MONGODB || process.env.DEV_MONGODB,
      { useNewUrlParser: true, useUnifiedTopology: true }
    ),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
