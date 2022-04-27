import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
//import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../auth/strategy/LocalStrategy';
import { AuthService } from '../auth/auth.service';

@Module({
  controllers: [UserController],
  imports: [
   // PassportModule.register({ defaultStrategy: 'local' }),
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
