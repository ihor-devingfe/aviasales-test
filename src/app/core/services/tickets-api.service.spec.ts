import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {TicketsApiService} from './tickets-api.service';
import {SearchId} from '../models/search-id.model';
import {TicketsResponse} from '../models/tickets-response.model';
import {Ticket} from '../models/ticket.model';

const searchId: SearchId = {searchId: 'testSearchId'};
const ticket: Ticket = {
  carrier: 'ACI',
  price: 29851,
  segments: [
    {
      origin: 'ALL',
      destination: 'ALM',
      date: '2020-07-24T10:34:37.308Z',
      stops: ['AIH', 'ABL', 'AKD'],
      duration: 522
    },
    {
      origin: 'ALL',
      destination: 'ALM',
      date: '2020-08-03T17:22:00.308Z',
      stops: [],
      duration: 274
    }
  ]
};

describe('TicketsApiService', () => {
  let service: TicketsApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TicketsApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getSearchId()', () => {
    it('should retrieve "searchId"', fakeAsync(() => {
      const response = {searchId: 'testSearchId'};

      service.getSearchId().subscribe(data => {
        expect(data.searchId).toBe('testSearchId');
      });

      const request = httpTestingController.expectOne('https://front-test.beta.aviasales.ru/search');

      expect(request.request.method).toEqual('GET');

      request.flush(response);

      tick();
    }));

    it('should return "fakeSearchId" in case of server error', fakeAsync(() => {
      const errorResponse = new ErrorEvent('HttpError');

      service.getSearchId().subscribe(res => {
        expect(res.searchId).toBe('fakeSearchId');
      });

      const request = httpTestingController.expectOne('https://front-test.beta.aviasales.ru/search');

      expect(request.request.method).toEqual('GET');

      request.error(errorResponse);

      tick();
    }));
  });

  describe('getAllTickets()', () => {
    it('should retrieve tickets', fakeAsync(() => {
      const response: TicketsResponse = {
        tickets: [ticket],
        stop: true
      };

      service.getAllTickets(searchId).subscribe(res =>
        expect(res).toEqual(response)
      );

      const request = httpTestingController.expectOne(
        `https://front-test.beta.aviasales.ru/tickets?searchId=${searchId.searchId}`
      );

      expect(request.request.method).toEqual('GET');
      expect(request.request.params.get('searchId')).toEqual(searchId.searchId);

      request.flush(response);

      tick();
    }));
  });
});
