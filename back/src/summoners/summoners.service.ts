import { Inject, Injectable, Logger } from '@nestjs/common'
import { CreateSummonerDto, Summoner } from './summoners.entity'
import { SummonerRepository } from './summoners.repository'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class SummonersService {
  constructor (

    @InjectRepository(SummonerRepository)
    private readonly SummonerRepository: SummonerRepository
  ) { }

    private readonly logger = new Logger(SummonersService.name);

    async save (summonrIn: CreateSummonerDto): Promise<Summoner> {
      const summoner = await this.SummonerRepository.createSummoner(summonrIn)
      return summoner
    }

    async findAll (params): Promise<Summoner[]> {
      return this.SummonerRepository.read(params)
    }

    async getAllSIDXs () {
      const summoners = await this.SummonerRepository.read({})
      return summoners.map(ele => ele.SIDX)

    }
}
