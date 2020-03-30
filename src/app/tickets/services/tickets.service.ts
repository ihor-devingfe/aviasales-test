import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, of, Subject, throwError} from 'rxjs';
import {
  catchError,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  pluck,
  repeat,
  switchMap,
  takeWhile,
  tap
} from 'rxjs/operators';

import {TicketsApiService} from '../../core/services/tickets-api.service';
import {Ticket} from '../../core/models/ticket.model';
import {SearchId} from '../../core/models/search-id.model';
import {TicketsResponse} from '../../core/models/tickets-response.model';
import {AppSortingPipe} from '../../shared/pipes/app-sorting.pipe';
import {AppFilteringPipe} from '../../shared/pipes/app-filtering.pipe';

export const DEFAULT_TRANSFERS = [0, 1, 2, 3];
export const DEFAULT_SORTING = 'price';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private filteringSubject: BehaviorSubject<number[]> = new BehaviorSubject<number[]>(DEFAULT_TRANSFERS);
  private sortingSubject: BehaviorSubject<string> = new BehaviorSubject<string>(DEFAULT_SORTING);
  private ticketsSubject: Subject<Ticket[]> = new Subject<Ticket[]>();
  private allTickets: Ticket[] = [];

  private aggregation = combineLatest([
    this.filteringSubject.asObservable(),
    this.sortingSubject.asObservable()
  ]).pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap(([transfers, sortingParam]) => {
      const filtered = this.filteringPipe.transform(this.allTickets, transfers);
      return of(this.sortingPipe.transform(filtered, sortingParam).splice(0, 5));
    })
  );

  tickets: Observable<Ticket[]> = this.ticketsSubject.asObservable();

  constructor(
    private ticketsApiService: TicketsApiService,
    private sortingPipe: AppSortingPipe,
    private filteringPipe: AppFilteringPipe
  ) {
  }

  getAllTickets(): void {
    this.ticketsApiService.getSearchId().pipe(
      concatMap((searchId: SearchId) => this.ticketsApiService.getAllTickets(searchId)
        .pipe(
          repeat(),
          takeWhile(({stop}: TicketsResponse) => !stop),
          catchError((error, response: Observable<TicketsResponse>) => {
            return error.status === 500 ? response : throwError(error);
          }),
          pluck('tickets'),
          tap(tickets => this.allTickets = [...this.allTickets, ...tickets]),
        )),
    ).subscribe({
      complete: () => {
        this.aggregation.subscribe(
          aggregatedTickets => this.ticketsSubject.next(aggregatedTickets)
        );
      }
    });
  }

  filterTickets(transfers: number[]): void {
    this.filteringSubject.next(transfers);
  }

  sortTickets(sortingParam: string): void {
    this.sortingSubject.next(sortingParam);
  }

}
