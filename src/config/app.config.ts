import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';

import {
    HTTP_INTERCEPTORS,
    provideHttpClient,
    withFetch,
} from '@angular/common/http';
import { AppErrorHandler } from '@config/error-handler/error-handler';
import { AppHttpErrorHandler } from '@config/error-handler/http-error-handler.interceptor';
import { provideTranslation } from '@config/translation/translation';
import { NotificationHandler } from '@core/notification/use-cases/notification.handler';
import { routes } from './app.routes';

// AoT requires an exported function for factories

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideClientHydration(),
        provideAnimationsAsync(),
        provideHttpClient(withFetch()),
        provideTranslation(),
        {
            provide: ErrorHandler,
            useClass: AppErrorHandler,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AppHttpErrorHandler,
            multi: true,
        },
        {
            provide: NotificationHandler,
        },
    ],
};
