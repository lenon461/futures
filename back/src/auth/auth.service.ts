import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, 
    private jwtService: JwtService
    ) {}
    private readonly logger = new Logger(AuthService.name);

  async validateUser(id: string, passwd: string): Promise<any> {
    const user = await this.usersService.findOne(id);
    this.logger.debug("validateUser")
    this.logger.debug(user)
    if (user && user.passwd === passwd) {
      const { userId, username, passwd } = user;
      return {userId, username};
    }
    return null;
  }

  async login(user: any) {
    this.logger.debug("login")
    this.logger.debug(user)
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}