import {TicketsService} from './tickets.service';
import {TicketsApiService} from '../../core/services/tickets-api.service';
import {AppSortingPipe} from '../../shared/pipes/app-sorting.pipe';
import {AppFilteringPipe} from '../../shared/pipes/app-filtering.pipe';
import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {EMPTY, of} from 'rxjs';
import {SearchId} from '../../core/models/search-id.model';
import {TicketsResponse} from '../../core/models/tickets-response.model';

const searchIdMock: SearchId = {searchId: 'mockSearchId'};
const ticketsResponseMock: TicketsResponse = {
  tickets: [{
    carrier: 'AAL',
    price: 56922,
    segments: [
      {
        origin: 'AIA',
        destination: 'AIC',
        date: '2020-05-19T10:34:37.308Z',
        stops: [],
        duration: 115
      },
      {
        origin: 'AIA',
        destination: 'AIC',
        date: '2020-06-19T10:33:00.308Z',
        stops: [],
        duration: 120
      }
    ]
  }],
  stop: true
};

describe('TicketsService', () => {
  let service: TicketsService;
  let apiService: TicketsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TicketsService, AppSortingPipe, AppFilteringPipe]
    });

    service = TestBed.inject(TicketsService);
    apiService = TestBed.inject(TicketsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default filters', () => {
    service['filteringSubject'] // tslint:disable-line no-string-literal
      .subscribe(filters => expect(filters.length).toBeTruthy());
  });

  it('should have default sorting', () => {
    service['sortingSubject'] // tslint:disable-line no-string-literal
      .subscribe(sorting => expect(sorting).toBeTruthy());
  });

  describe('getAllTickets()', () => {
    it('should initiate search', () => {
      const searchIdSpy = spyOn(apiService, 'getSearchId').and.returnValue(EMPTY);
      service.getAllTickets();
      expect(searchIdSpy).toHaveBeenCalled();
    });

    it('should set searchId', () => {
      spyOn(apiService, 'getSearchId').and.returnValue(of(searchIdMock));
      const ticketsSpy = spyOn(apiService, 'getAllTickets').and.returnValue(EMPTY);
      service.getAllTickets();
      expect(ticketsSpy).toHaveBeenCalledWith(searchIdMock);
    });

    it('should get tickets from server', () => {
      spyOn(apiService, 'getSearchId').and.returnValue(of(searchIdMock));
      spyOn(apiService, 'getAllTickets').and.returnValue(of(ticketsResponseMock));
      const onSearchEndSpy = spyOn(service, 'onSearchEnd' as any).and.stub();
      service.getAllTickets();
      expect(onSearchEndSpy).toHaveBeenCalledWith(ticketsResponseMock.tickets);
    });
  });

  describe('onSearchEnd()', () => {
    it('should save received tickets', () => {
      service['onSearchEnd'](ticketsResponseMock.tickets); // tslint:disable-line no-string-literal
      expect(service['allTickets']).toEqual(ticketsResponseMock.tickets); // tslint:disable-line no-string-literal
    });

    it('should initiate tickets aggregation', () => {
      service.tickets$.subscribe(tickets => expect(tickets).toEqual(ticketsResponseMock.tickets));
      service['onSearchEnd'](ticketsResponseMock.tickets); // tslint:disable-line no-string-literal
    });
  });

  describe('filterTickets()', () => {
    it('should filter tickets by received filters', () => {
      const filters = [1, 2, 3];
      service.filterTickets(filters);
      service['filteringSubject'] // tslint:disable-line no-string-literal
        .subscribe(f => expect(f).toEqual(filters));
    });
  });

  describe('sortTickets()', () => {
    it('should sort tickets by received parameter', () => {
      const param = 'param';
      service.sortTickets(param);
      service['sortingSubject'] // tslint:disable-line no-string-literal
        .subscribe(sortingParam => expect(sortingParam).toBe(param));
    });
  });
});
