import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule,
     // JwtModule.register({
     //   secret: process.env.SECRET_KEY,
     // }),
    UserModule,
  ],
  exports: [AuthService],
  providers: [AuthService],
})
export class AuthModule {}
