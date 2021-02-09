import { Controller, Get, Post, Logger, UseGuards, Request, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto'

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
    private readonly logger = new Logger(UsersController.name);

    
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return this.usersService.readOne(req.user.id);
    }
    
    @Post('')
    async signUp(@Body() CreateUserDto) {
        return this.usersService.create(CreateUserDto);
    }
}
