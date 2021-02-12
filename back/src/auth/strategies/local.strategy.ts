import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common'
import { AuthService } from '../auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor (private authService: AuthService) {
    super({
      usernameField: 'id',
      passwordField: 'passwd'
    })
  }

  private readonly logger = new Logger(LocalStrategy.name);

  async validate (id: string, passwd: string, done): Promise<any> {
    this.logger.debug('📢 LocalStartegyss2')
    this.logger.debug(id + passwd)
    const member = await this.authService.validateMember(id, passwd)
    if (!member) {
      throw new UnauthorizedException()
    }
    return member
  }
}
