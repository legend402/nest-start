import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/controllers/userController/user.service';
import { User } from 'src/database/entity/user.entity';
import {BlacklistService} from "./blacklist.service";
import {jwtConstants} from "./constants";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly blacklistService: BlacklistService,
  ) {
    this.userService = userService;
    this.jwtService = jwtService;
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<{ code: number; user: User | null }> {
    const user = await this.userService.findOne({
      where: {
        username,
      },
      select: [
        'age',
        'email',
        'password',
        'username',
        'realName',
        'userId',
        'avatar',
        'accessCodes',
        'idCard',
      ],
    });
    if (user) {
      const metaPassword = user.password;
      if (metaPassword === password) {
        return {
          code: 1,
          user,
        };
      } else {
        return {
          code: 2,
          user: null,
        };
      }
    } else {
      return {
        code: 3,
        user: null,
      };
    }
  }

  async certificate(user: User) {
    const signState = {
      userId: user.userId,
      username: user.username,
      password: user.password,
    };
    try {
      const token = this.jwtService.sign(signState);
      return token;
    } catch {
      return '账号或密码错误';
    }
  }

  async getUserInfo(token: string) {
    const userInfo = this.jwtService.verify(token, {
      secret: jwtConstants.secret,
    });
    if (!userInfo) {
      return null;
    }
    return this.userService.findOne({
      where: {
        userId: userInfo.userId,
      },
    });
  }

  async logout(token: string) {
    try {
      this.blacklistService.addToBlacklist(token);
      return '登出成功';
    } catch (error) {
      return '登出失败';
    }
  }
}
