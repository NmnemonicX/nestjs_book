import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class BookInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('ДО...');
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        console.log(`После... ${Date.now() - now}ms`);
      }),
      map((data) => ({
        status: 'success',
        data,
      })),
      catchError((err) => {
        const errx = new HttpException(
          { status: 'fail', data: err },
          HttpStatus.BAD_REQUEST,
        );
        return throwError(() => errx);
      }),
    );
  }
}
