import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone, inject } from '@angular/core';
import { NotificationHandler } from '@core/notification/use-cases/notification.handler';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
    private notificationService: NotificationHandler =
        inject(NotificationHandler);

    constructor(private zone: NgZone) {}

    handleError(error: unknown): void {
        console.error('Caught by Custom Error Handler: ', error);

        if (!(error instanceof HttpErrorResponse)) {
            this.zone.run(() => {
                this.notificationService.danger({
                    messageKeyTrad: 'ERROR.UNKNOW',
                });
            });
        }
    }
}
