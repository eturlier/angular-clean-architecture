import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideTranslation } from '@config/translation/translation';
import { routes } from './app.routes';

// AoT requires an exported function for factories

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideClientHydration(),
        provideAnimationsAsync(),
        provideHttpClient(withFetch()),
        provideTranslation(),
    ],
};
