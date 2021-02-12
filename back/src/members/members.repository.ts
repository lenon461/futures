import { Inject, Injectable, Logger, Optional, NotFoundException } from '@nestjs/common'
import { Member, CreateMemberDto } from './members.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Connection, DeleteResult, EntityRepository, Repository } from 'typeorm'

@EntityRepository(Member)
export class MemberRepository extends Repository<Member> {
  private readonly logger = new Logger(MemberRepository.name);

  public async createMember (memberIn: CreateMemberDto): Promise<Member> {
    const newMember = { M_ID: memberIn.id, M_NAME: memberIn.name, M_PASSWD: memberIn.passwd, }
    return this.save(newMember)
  }

  public async read (cond): Promise<Member[]> {
    return this.find(cond)
  }
  public async readOne (cond): Promise<Member> {
    return this.findOne(cond)
  }

  public async updatMember (Member: Member): Promise<Member> {
    return this.save(Member)
  }

  public async delete (Member: Member): Promise<DeleteResult> {
    return this.delete(Member)
  }
}

export const MemberRepositoryProvider = {
  provide: 'MemberRepository',
  useFactory: (connection: Connection) => connection.getCustomRepository(MemberRepository),
  inject: [Connection]
}
