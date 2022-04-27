import {Body, Controller, Post, Req, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDTO, signinUserDTO } from './model/user.dto';
import { LocalAuthGuard } from '../Guards/local-auth.guard';

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
  login(@Req() req, @Body() Dto: signinUserDTO) {
    const xreturn = this.userService.signIn(req.user._doc);
    return xreturn;

  }
}
