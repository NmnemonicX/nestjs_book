import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth/strategy/LocalStrategy';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.development.env', // `.${process.env.NODE_ENV}.env`,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/demo'),
    BookModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, LocalStrategy],
})
export class AppModule {}
