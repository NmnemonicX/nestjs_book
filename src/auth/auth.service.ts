import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,

  ) {}

  public async validateUser(email: string, pass: string) {
    const user = await this.userService.findOneEmail(email);
    if (user && user.password == pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }


}
