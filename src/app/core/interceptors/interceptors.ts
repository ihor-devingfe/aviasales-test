import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {Provider} from '@angular/core';

import {LoaderInterceptor} from './loader.interceptor';

export const httpInterceptorProviders: Provider[] = [
  {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true}
];
