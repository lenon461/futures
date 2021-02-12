import { BullModule } from '@nestjs/bull'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { AssetsController } from './assets.controller'
import { Asset } from './assets.entity'
import { AssetsService } from './assets.service'
import { AssetRepositoryProvider, AssetRepository } from './assets.repository'

import { SummonerRepositoryProvider, SummonerRepository } from 'src/summoners/summoners.repository'
import { SummonersService } from 'src/summoners/summoners.service'
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'asset'
    }),
    TypeOrmModule.forFeature([AssetRepository]),
    // TypeOrmModule.forFeature([SummonerRepository]),
  ],

  controllers: [AssetsController],
  providers: [AssetsService, AssetRepositoryProvider, SummonersService, SummonerRepositoryProvider]

})
export class AssetsModule { }
