import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { AuthGuard } from "@nestjs/passport";
import {JwtService} from "@nestjs/jwt";
import {getToken} from "../../utils";
import {jwtConstants} from "./constants";

@Injectable()
export class jwtAuth extends AuthGuard('jwt') {
  constructor(private readonly jwtService: JwtService, private reflector: Reflector) {
    super()
    this.jwtService = jwtService;
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;
    const req = context.switchToHttp().getRequest()
    const user = this.jwtService.verify(getToken(req), { secret: jwtConstants.secret })
    if (!user) {
      throw new UnauthorizedException('Token 已过期, 请重新登录');
    }
    req.user = user;
    return true;
  }
}
