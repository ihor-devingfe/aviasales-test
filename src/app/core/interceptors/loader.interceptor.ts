import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, finalize} from 'rxjs/operators';

import {LoaderService} from '../services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.showLoader();

    return next.handle(request).pipe(
      filter((event) => event instanceof HttpResponse),
      finalize(() => this.loaderService.hideLoader())
    );
  }
}
