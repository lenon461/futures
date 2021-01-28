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
    const user = await this.usersService.readOne(id);
    if (user && user.passwd === passwd) {
      const { _id, id, name, passwd } = user;
    return {_id, id, name,};
    }
    return null;
  }

  async login(user: any) {
    const payload = { 
      _id: user._id, 
      id: user.id,
      name: user.name,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}