import { Controller, Get, Post, Logger, UseGuards, Request, Body } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { MembersService } from './members.service'
import { CreateMemberDto, Member } from "./members.entity"
import { AssetsService } from 'src/assets/assets.service';
@Controller('members')
export class MembersController {
  constructor (
    private membersService: MembersService,
    private assetsService: AssetsService,
    ) {}
    private readonly logger = new Logger(MembersController.name);

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile (@Request() req) {
      this.logger.debug(req.user.id)
      return await this.membersService.findMemberbyId(req.user.id)
    }

    @Post('')
    async postMember (@Body() mermberIn: CreateMemberDto) {
      const member = await this.membersService.addNewMember(mermberIn)
      const asset = await this.assetsService.addWallet(member.MIDX)
      return member;
    }
}
