import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { BlacklistService } from "./blacklist.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
      private readonly authService: AuthService,
      private readonly blacklistService: BlacklistService
  ) {
    super();
    this.authService = authService;
  }

  async validate(username: string, password: string): Promise<any> {
    const { user } = await this.authService.validateUser(username, password);
    if (!user) {
      return new UnauthorizedException();
    }
    return user;
  }
}
