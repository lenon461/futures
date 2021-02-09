import {
  ExecutionContext,
  Injectable,
  UnauthorizedException, Logger
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  canActivate (context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context)
  }

  handleRequest (err, user, info) {
    this.logger.debug('handleRequest')
    this.logger.debug(err)
    this.logger.debug(user)
    this.logger.debug(info)
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException()
    }
    return user
  }
}
