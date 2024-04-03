import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { NotificationHandler } from '@core/notification/use-cases/notification.handler';
import {
    MonoTypeOperatorFunction,
    Observable,
    OperatorFunction,
    throwError,
    timer,
} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

function retryWithDelay(count: number): MonoTypeOperatorFunction<unknown> {
    return retry({
        count,
        delay: (error, retryCount) => timer(retryCount * 1000),
    });
}

@Injectable()
export class AppHttpErrorHandler implements HttpInterceptor {
    private notificationService: NotificationHandler =
        inject(NotificationHandler);

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            retryWithDelay(2) as OperatorFunction<
                HttpEvent<unknown>,
                HttpEvent<unknown>
            >,
            catchError((error: HttpErrorResponse) => {
                console.error('Caught by HTTP interceptor: ', error);
                let message: string = 'ERROR.UNKNOW';

                switch (error.status) {
                    case 400:
                        this.notificationService.danger({
                            messageKeyTrad: 'ERROR.400',
                        });
                        break;

                    case 401:
                        // TODO: Redirect to login page
                        this.notificationService.danger({
                            messageKeyTrad: 'ERROR.401',
                        });
                        break;

                    case 403:
                        this.notificationService.danger({
                            messageKeyTrad: 'ERROR.403',
                        });
                        break;

                    case 404:
                        this.notificationService.danger({
                            messageKeyTrad: 'ERROR.404',
                        });
                        break;

                    case 500:
                        this.notificationService.danger({
                            messageKeyTrad: 'ERROR.500',
                        });
                        break;

                    default:
                        message += ` (Status code: ${error.status})`;
                        if (error.error && error.error.message) {
                            message += ` (${error.error.message})`;
                        } else if (error.message) {
                            message += ` (${error.message})`;
                        }

                        this.notificationService.danger({
                            messageKeyTrad: message,
                        });
                        break;
                }

                return throwError(() => error);
            })
        );
    }
}
