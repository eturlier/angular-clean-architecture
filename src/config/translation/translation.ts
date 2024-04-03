import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import localeFrExtra from '@angular/common/locales/extra/fr';
import localeFr from '@angular/common/locales/fr';
import { importProvidersFrom } from '@angular/core';
import {
    TranslateLoader,
    TranslateModule,
    TranslateModuleConfig,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// register locale fr
registerLocaleData(localeFr, 'fr-FR', localeFrExtra);

// AoT requires an exported function for factories
const TRANSLATION_GUID = '5e609b73-8511-47ad-bf98-b55707b19f20';
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(
        http,
        './assets/i18n/langs/',
        '_' + TRANSLATION_GUID + '.json'
    );
}

export const translationConfig: TranslateModuleConfig = {
    defaultLanguage: 'fr',
    loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
    },
};

export function provideTranslation() {
    return importProvidersFrom([
        HttpClientModule,
        TranslateModule.forRoot(translationConfig),
    ]);
}
