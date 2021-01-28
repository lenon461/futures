import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super()
  }
  private readonly logger = new Logger(LocalStrategy.name);

  async validate(id: string, passwd: string): Promise<any> {
    const user = await this.authService.validateUser(id, passwd);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}