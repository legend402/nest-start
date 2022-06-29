import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/controllers/userController/user.service';
import { User } from 'src/database/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
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
        name: username,
      },
      select: [
        'age',
        'email',
        'password',
        'name',
        'id',
        'pictureId',
        'authority',
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
      id: user.id,
      name: user.name,
      password: user.password,
    };
    try {
      const token = this.jwtService.sign(signState);
      console.log(token);
      return token;
    } catch {
      return '账号或密码错误';
    }
  }
}
