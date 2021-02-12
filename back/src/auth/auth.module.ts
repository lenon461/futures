import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { MembersModule } from '../members/members.module'
import { AuthGuard, PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants'
import { AuthController } from './auth.controller'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'
import { OpenApiStrategy } from './strategies/open-api.strategy'

@Module({
  imports: [
    MembersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24000s' }
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, OpenApiStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
