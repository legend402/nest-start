import {Body, Controller, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import { omit } from 'lodash';
import { User } from 'src/database/entity/user.entity';
import { AuthService } from 'src/logical/auth/auth.service';
import { UserService } from './user.service';
import { Public } from '../../common/decorator/public.decorator';
import {Request} from "express";
import {getToken} from "../../utils";
import {AuthGuard} from "@nestjs/passport";

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) { }

  @Public()
  @Post('register')
  async register(@Body() user: User) {
    if (user.username && !user.realName) {
      user.realName = user.username
    }
    return this.userService.saveOne(user);
  }

  @Get('list')
  async getAll() {
    return this.userService.findAll({ relations: ['articles'] });
  }

  @Get('queryById')
  async fineOne(@Param() params: User) {
    return this.userService.findAll({ relations: ['articles'] });
  }

  @Public()
  @Post('login')
  async login(@Body() user: User) {
    const { code, user: findUser } = await this.authService.validateUser(
      user.username,
      user.password,
    );
    switch (code) {
      case 1:
        const token = await this.authService.certificate(findUser);
        return {
          accessToken: token,
          user: omit(findUser, ['password']),
        };
      case 2:
        return `密码不正确`;
      default:
        return `用户不存在`;
    }
  }
  /**
   * 根据 token 获取用户信息
   * */
  @Get('info')
  async info(@Req() req: Request) {
    const token = getToken(req)
    if (token) {
      const user = await this.authService.getUserInfo(token)
      return omit(user, ['password'])
    }
    return {};
  }

  /**
   * 获取codes
   */
  @Get('codes')
  async codes(@Req() req: Request) {
    const token = getToken(req)
    if (token) {
      const user = await this.authService.getUserInfo(token)
      return user.accessCodes?.split(',') || []
    }
  }
  /**
   * 登出
   * */
  @Public()
  @Post('logout')
  async logout(@Req() req: Request) {
    const token = getToken(req)
    if (token) {
      return await this.authService.logout(token)
    }
    return '登出成功'
  }
}
