import { Controller, Get, Logger, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
    private readonly logger = new Logger(UsersController.name);

    
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        this.logger.debug("getProfile")
        return req.user;
    }
}
