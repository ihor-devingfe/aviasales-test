import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class FallbackInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (
      request.url.endsWith('/tickets')
      && request.params.get('searchId') === 'fakeSearchId'
    ) {
      const newRequest = request.clone({
        url: 'https://raw.githubusercontent.com/ihor-devingfe/aviasales-test/master/db.json'
      });
      return next.handle(newRequest);
    }

    return next.handle(request);
  }
}

