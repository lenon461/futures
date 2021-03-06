import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class OpenApiAuthGuard implements CanActivate {
  private readonly logger = new Logger(OpenApiAuthGuard.name);
  canActivate (context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    this.logger.debug('canActivate')
    this.logger.debug(request.headers)
    // add verify logic here
    return true
  }
}
