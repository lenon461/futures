import { Inject, Injectable, Logger } from '@nestjs/common'
import { create } from 'lodash'
import { Model } from 'mongoose'
import { User } from './interfaces/user.interface'

@Injectable()
export class UsersService {
  constructor (@Inject('USER_MODEL') private readonly userModel: Model<User>) { }
    private readonly logger = new Logger(UsersService.name);

    async readOne (id: string): Promise<User | undefined> {
      this.logger.debug('readOne')
      return this.userModel.findOne({ id }).exec()
    }

    async create (createUserDto): Promise<User | undefined> {
      const walletedUser = this.makeWallets(createUserDto)
      const createdUser = new this.userModel(walletedUser)
      const user = await createdUser.save()
      return user
    }

    makeWallets (createUserDto) {
      const defaultAssets = { fp: 10000 }
      createUserDto.assets = defaultAssets
      return createUserDto
    }

    async updateWallets (id: string, marketId: string) {
      const user = await this.userModel.findOne({ id }).exec()
    }
}
