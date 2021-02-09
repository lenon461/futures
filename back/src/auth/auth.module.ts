import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersModule } from '../users/users.module'
import { AuthGuard, PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants'
import { AuthController } from './auth.controller'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'
import { OpenApiStrategy } from './strategies/open-api.strategy'

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2400s' }
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, OpenApiStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
