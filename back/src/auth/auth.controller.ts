import { Controller, Get, Post, UseGuards, Put, Request, Delete, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { OpenApiAuthGuard } from './guards/open-api-auth.guard';

@Controller('auth')
export class AuthController {
    
    constructor(private authService: AuthService) {}
    private readonly logger = new Logger(AuthController.name);
    
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        this.logger.debug("getProfile")
        return req.user;
    }

    @UseGuards(OpenApiAuthGuard)
    @Get('openapi')
    test(@Request() req) {
        return "success";
    }
}
