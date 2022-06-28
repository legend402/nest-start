import {Body, Controller, Get, Post} from '@nestjs/common';
import { omit } from 'lodash';
import { User } from 'src/database/entity/user.entity';
import { AuthService } from 'src/logical/auth/auth.service';
import { UserService } from './user.service';
import { Public } from "../../common/decorator/public.decorator";

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('register')
  async register(@Body() user: User) {
    return this.userService.saveOne(user);
  }

  @Get()
  async getAll() {
    return this.userService.findAll();
  }

  @Public()
  @Post('login')
  async login(@Body() user: User) {
    const { code, user: findUser } = await this.authService.validateUser(
      user.name,
      user.password,
    );
    switch (code) {
      case 1:
        const token = await this.authService.certificate(findUser)
        return {
          token,
          user: omit(findUser, ['password']),
        };
      case 2:
        return `密码不正确`;
      default:
        return `用户不存在`;
    }
  }
}
