import { Inject, Injectable, Logger } from '@nestjs/common'
import { CreateMemberDto, Member } from './members.entity'
import { MemberRepository } from './members.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
@Injectable()
export class MembersService {
  constructor (

    @InjectRepository(MemberRepository)
    private readonly memberRepository: MemberRepository
  ) { }

    private readonly logger = new Logger(MembersService.name);

    async addNewMember (memberIn: CreateMemberDto): Promise<Member> {
      const member = await this.memberRepository.createMember(memberIn)
      return member
    }

    async findAll (params) {
      const member = await this.memberRepository.read(params)
      return member
    }

    async findMemberbyId (id): Promise<Member>  {
      this.logger.debug(id)
      const member = await this.memberRepository.readOne({M_ID: id})
      this.logger.debug(member)
      return member
    }
}
