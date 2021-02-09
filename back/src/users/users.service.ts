import { Inject, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
    constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) { }
    private readonly logger = new Logger(UsersService.name);

  async readOne(id: string): Promise<User | undefined> {
    this.logger.debug("readOne")
    return this.userModel.findOne({ id }).exec()
  }
  
  async create(createUserDto): Promise<User | undefined> {
    const createdUser = new this.userModel(createUserDto);
    const user = await createdUser.save();
    return user
  }
}