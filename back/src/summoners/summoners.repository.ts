import { Inject, Injectable, Logger, Optional, NotFoundException } from '@nestjs/common'
import { Summoner, CreateSummonerDto } from './Summoners.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Connection, DeleteResult, EntityRepository, Repository } from 'typeorm'

@EntityRepository(Summoner)
export class SummonerRepository extends Repository<Summoner> {
  private readonly logger = new Logger(SummonerRepository.name);

  public async createSummoner (SummonerIn: CreateSummonerDto): Promise<Summoner> {
    const newSummoner = { ...SummonerIn }
    return this.save(newSummoner)
  }

  public async read (cond): Promise<Summoner[]> {
    return this.find(cond)
  }

  public async updatSummoner (Summoner: Summoner): Promise<Summoner> {
    return this.save(Summoner)
  }

  public async delete (Summoner: Summoner): Promise<DeleteResult> {
    return this.delete(Summoner)
  }
}

export const SummonerRepositoryProvider = {
  provide: 'SummonerRepository',
  useFactory: (connection: Connection) => connection.getCustomRepository(SummonerRepository),
  inject: [Connection]
}
