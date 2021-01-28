import { AuthGuard } from '@nestjs/passport';
import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import {AuthService} from '../auth.service'
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {

    constructor(private authSerivce: AuthService) {
        super();
    }

    private readonly logger = new Logger(LocalAuthGuard.name);

    async canActivate(context: ExecutionContext): Promise<boolean>  {
        const request = context.switchToHttp().getRequest();
        const user = await this.authSerivce.validateUser('jslee', '1234')
        if(user) {
            request.user = {
                _id: user.id,
                id: user.id,
                name: user.name,
            }
            return true;
        }
        return false
    }
}