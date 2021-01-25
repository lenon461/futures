import { Controller, Get, Post, UseGuards, Put, Request, Delete, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    
    constructor(private authService: AuthService) {}
    private readonly logger = new Logger(AuthController.name);
        
    
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        console.log(req.user)
        return req.user;
        // return this.authService.login(req.user);
    }
    @Post('login2')
    async login2(@Request() req) {
        console.log("THIS IS LOGIN 222")
        return req.user;
        // return this.authService.login(req.user);
    }
}
