import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import {getRequestTokenUser, getToken} from "../../utils";
import {asyncLocalStorage} from "../../utils/localStorage";
import {TOKEN_KEY} from "../../constants";
import {JwtService} from "@nestjs/jwt";
import {jwtConstants} from "../../logical/auth/constants";
import {TokenUserMes} from "../../types/common";


@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {
    this.jwtService = jwtService;
  }

  use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = getToken(req);
      const user: TokenUserMes = this.jwtService.verify(token, {secret: jwtConstants.secret})
      asyncLocalStorage.run({user}, () => {
        next();
      });
    } catch (e) {
      next()
    }
  }
}
