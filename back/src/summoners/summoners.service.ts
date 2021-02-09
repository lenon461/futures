import { Inject, Injectable, Logger } from '@nestjs/common'
import { Model } from 'mongoose'
import { CreateSummonerDto } from './dto/create-summoner.dto'
import { Summoner } from './interfaces/summoner.interface'

@Injectable()
export class SummonersService {
  constructor (@Inject('SUMMONER_MODEL') private readonly summonerModel: Model<Summoner>) { }
    private readonly logger = new Logger(SummonersService.name);

    async create (createSummonerDto: CreateSummonerDto): Promise<Summoner> {
      const createdSummoner = new this.summonerModel(createSummonerDto)
      const summoner = await createdSummoner.save()
      return summoner
    }

    async readOne (name: string): Promise<Summoner> {
      return this.summonerModel.findOne({ name })
    }

    async readAll (): Promise<Summoner[]> {
      return this.summonerModel.find({}).exec()
    }
}
