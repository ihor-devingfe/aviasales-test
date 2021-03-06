import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Params} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {SearchId} from '../models/search-id.model';
import {TicketsResponse} from '../models/tickets-response.model';

const URL = 'https://front-test.beta.aviasales.ru';

@Injectable({
  providedIn: 'root'
})
export class TicketsApiService {
  constructor(private http: HttpClient) {
  }

  getSearchId(): Observable<SearchId> {
    return this.http.get<SearchId>(`${URL}/search`).pipe(
      catchError(() => {
        return of({searchId: 'fakeSearchId'});
      })
    );
  }

  getAllTickets({searchId}: SearchId): Observable<TicketsResponse> {
    const params: Params = new HttpParams().set('searchId', searchId);
    return this.http.get<TicketsResponse>(`${URL}/tickets`, {params});
  }
}
