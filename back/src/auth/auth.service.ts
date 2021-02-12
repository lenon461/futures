import { Injectable, Logger } from '@nestjs/common'
import { MembersService } from '../members/members.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor (
    private membersService: MembersService,
    private jwtService: JwtService
  ) {}

    private readonly logger = new Logger(AuthService.name);

    async validateMember (id: string, passwd: string): Promise<any> {
      this.logger.debug("validateMember")
      const member = await this.membersService.findMemberbyId(id)
      if (member && member.M_PASSWD === passwd) {
        const { MIDX, M_ID, M_NAME, M_PASSWD } = member
        return { _id: MIDX, id: M_ID, name: M_NAME }
      }
      return null
    }

    async login (user: any) {
      this.logger.debug("user")
      this.logger.debug(user)
      const payload = { _id: user._id, id: user.id, name: user.name }
      return {
        access_token: this.jwtService.sign(payload)
      }
    }
}
