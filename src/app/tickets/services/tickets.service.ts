import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, of, Subject, throwError} from 'rxjs';
import {catchError, concatMap, pluck, reduce, repeat, switchMap, takeWhile} from 'rxjs/operators';

import {TicketsApiService} from '../../core/services/tickets-api.service';
import {Ticket} from '../../core/models/ticket.model';
import {SearchId} from '../../core/models/search-id.model';
import {TicketsResponse} from '../../core/models/tickets-response.model';
import {AppSortingPipe} from '../../shared/pipes/app-sorting.pipe';
import {AppFilteringPipe} from '../../shared/pipes/app-filtering.pipe';

const DEFAULT_TRANSFERS = [0, 1, 2, 3];
const DEFAULT_SORTING = 'price';

@Injectable()
export class TicketsService {
  private filteringSubject: BehaviorSubject<number[]> = new BehaviorSubject<number[]>(DEFAULT_TRANSFERS);
  private sortingSubject: BehaviorSubject<string> = new BehaviorSubject<string>(DEFAULT_SORTING);
  private ticketsSubject: Subject<Ticket[]> = new Subject<Ticket[]>();
  tickets$: Observable<Ticket[]> = this.ticketsSubject.asObservable();
  private allTickets: Ticket[] = [];
  private aggregation$: Observable<Ticket[]> = combineLatest([
    this.filteringSubject.asObservable(),
    this.sortingSubject.asObservable()
  ]).pipe(
    concatMap(([transfers, sortingParam]) => {
      const filteredTickets = this.filteringPipe.transform(this.allTickets, transfers);
      return of(this.sortingPipe.transform(filteredTickets, sortingParam).slice(0, 5));
    })
  );

  constructor(
    private ticketsApiService: TicketsApiService,
    private sortingPipe: AppSortingPipe,
    private filteringPipe: AppFilteringPipe
  ) {
  }

  getAllTickets(): void {
    this.ticketsApiService.getSearchId().pipe(
      switchMap((searchId: SearchId) => this.ticketsApiService.getAllTickets(searchId)
        .pipe(
          repeat(),
          takeWhile(({stop}: TicketsResponse) => !stop),
          catchError((error, response: Observable<TicketsResponse>) => {
            return error.status === 500 ? response : throwError(error);
          }),
          pluck('tickets'),
          reduce((acc, curr) => [...acc, ...curr], [])
        ),
      ),
    ).subscribe(this.onSearchEnd);
  }

  filterTickets(transfers: number[]): void {
    this.filteringSubject.next(transfers);
  }

  sortTickets(sortingParam: string): void {
    this.sortingSubject.next(sortingParam);
  }

  private onSearchEnd = (tickets: Ticket[]): void => {
    this.allTickets = tickets;
    this.aggregation$.subscribe(aggregatedTickets => this.ticketsSubject.next(aggregatedTickets));
  }
}
