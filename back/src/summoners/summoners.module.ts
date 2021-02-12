import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SummonersController } from './summoners.controller'
import { SummonersService } from './summoners.service'
import { DatabaseModule } from '../database/database.module'
import { SummonerRepositoryProvider, SummonerRepository } from './summoners.repository'

@Module({
  imports: [DatabaseModule,
    TypeOrmModule.forFeature([SummonerRepository])],
  controllers: [SummonersController],
  providers: [SummonersService, SummonerRepositoryProvider],
  exports: [SummonersService]
})
export class SummonersModule { }
