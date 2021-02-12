import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MembersService } from './members.service'
import { MembersController } from './members.controller'
import { DatabaseModule } from '../database/database.module'
import { Member } from './members.entity'
import { MemberRepository, MemberRepositoryProvider } from './members.repository'
import { AssetsService } from 'src/assets/assets.service'
import { AssetRepositoryProvider } from 'src/assets/assets.repository'
import { SummonersService } from 'src/summoners/summoners.service'
import { SummonerRepositoryProvider } from 'src/summoners/summoners.repository'

@Module({
  imports: [DatabaseModule,
    TypeOrmModule.forFeature([MemberRepository])
  ],
  controllers: [MembersController],
  providers: [MembersService, MemberRepositoryProvider, 
    AssetsService, AssetRepositoryProvider,
    SummonersService, SummonerRepositoryProvider
  ],
  exports: [MembersService]
})
export class MembersModule {}
