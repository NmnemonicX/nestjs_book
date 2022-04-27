// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { AuthService } from '../auth.service';
// import { ExtractJwt, Strategy } from 'passport-jwt';
//
// const JWT_SECRET = 'secret1';
//
// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private authService: AuthService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: process.env.SECRET_KEY,
//     });
//   }
//
//   public async validate(payload: any) {
//     const user = await this.authService.validateUser(
//       payload.email,
//       payload.password,
//     );
//     if (!user) {
//       throw new UnauthorizedException();
//     }
//
//     return user;
//   }
// }
