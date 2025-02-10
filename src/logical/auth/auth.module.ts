import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/controllers/userController/user.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { BlacklistService } from "./blacklist.service";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '3h',
      }, // token 过期时效
    }),
    UserModule,
  ],
  providers: [AuthService, JwtStrategy, BlacklistService],
  exports: [AuthService, BlacklistService],
})
export class AuthModule {}
