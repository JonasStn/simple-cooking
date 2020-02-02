import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

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
    )
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
