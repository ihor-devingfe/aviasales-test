import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {Provider} from '@angular/core';

import {LoaderInterceptor} from './loader.interceptor';
import {FallbackInterceptor} from './fallback.interceptor';

export const httpInterceptorProviders: Provider[] = [
  {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: FallbackInterceptor, multi: true},
];
