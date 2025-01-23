import {Injectable, UnauthorizedException} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';
import {Request} from "express";
import {UserService} from "../../controllers/userController/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
    this.userService = userService;
  }

  async validate(payload: any) {
    console.log('jwt.strategy', payload);
    const { username } = payload
    if (!username) {
      throw new UnauthorizedException('token令牌非法，请重新登录');
    }
    return {
      username
    }
  }
}
