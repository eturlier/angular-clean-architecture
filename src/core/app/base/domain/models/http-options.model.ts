import { HttpContext, HttpHeaders } from '@angular/common/http';
import { CustomHttpParams } from '@core/base/gateways/http/custom-http-params';

export class HttpOptions {
    headers?:
        | HttpHeaders
        | {
              [header: string]: string | string[];
          };
    context?: HttpContext;
    observe?: string = 'body';
    params?:
        | CustomHttpParams
        | {
              [param: string]:
                  | string
                  | number
                  | boolean
                  | ReadonlyArray<string | number | boolean>;
          };
    reportProgress?: boolean;
    responseType: string = 'json';
    withCredentials?: boolean;
    transferCache?:
        | {
              includeHeaders?: string[];
          }
        | boolean;
}
