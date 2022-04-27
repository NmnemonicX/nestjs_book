import {Body, Controller, Post, Req, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDTO, signinUserDTO } from './model/user.dto';
import { LocalAuthGuard } from '../Guards/local-auth.guard';
//import { AuthGuard } from '@nestjs/passport';
import {AuthService} from "../auth/auth.service";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService
             ) {}

  @Post('/signup')
  create(@Body() Dto: createUserDTO) {
    return this.userService.create(Dto);
  }

  @Post('/signin')
  @UseGuards(LocalAuthGuard)
  //@UseGuards(AuthGuard('local') )
  login(@Req() req, @Body() Dto: signinUserDTO) {
   // const xreturn = this.service.signIn(req);
    return "sign-test";

  }
}
