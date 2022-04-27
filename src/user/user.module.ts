import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
//import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../auth/strategy/LocalStrategy';
import { AuthService } from '../auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import {ConfigModule} from "@nestjs/config";

const secret = process.env.SECRET_KEY;

@Module({
  controllers: [UserController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.development.env', // `.${process.env.NODE_ENV}.env`,
    }),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  exports: [UserService],
  providers: [UserService, AuthService, LocalStrategy],
})
export class UserModule {}
