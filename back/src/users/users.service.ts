import { Injectable, Logger } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);
    private readonly users = [
    {
      userId: 1,
      username: 'jslee',
      passwd: '1234',
    },
    {
      userId: 2,
      username: 'maria',
      passwd: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    this.logger.debug("findOne")
    return this.users.find(user => user.username === username);
  }
}