import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class OpenApiStrategy extends PassportStrategy(Strategy, 'openapi') {
  constructor() {
    super({
      "test":"test"
    })
  }
  private readonly logger = new Logger(OpenApiStrategy.name);

  async validate(...args): Promise<any> {
    return true;
  }
}