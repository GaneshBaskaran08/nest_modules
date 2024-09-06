import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const fullUrl = `From Interceptor: ${req.protocol}://${req.get('host')}${req.originalUrl}`;
    console.log(fullUrl);

    const now = Date.now();
    return next.handle().pipe(
      tap(() => console.log(`After... ${Date.now() - now}ms`)),
      map((data) => {
        console.log('Response data:', data);
        return {
            isSucces: true,
            data
        }
      }),
    );
  }
}
