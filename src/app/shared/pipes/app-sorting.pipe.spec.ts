import {AppSortingPipe} from './app-sorting.pipe';
import {Ticket} from '../../core/models/ticket.model';

const tickets: Ticket[] = [
  {
    carrier: 'AAL',
    price: 56922,
    segments: [
      {
        origin: 'AIA',
        destination: 'AIC',
        date: '2020-05-19T10:34:37.308Z',
        stops: [],
        duration: 200
      },
      {
        origin: 'AIA',
        destination: 'AIC',
        date: '2020-06-19T10:33:00.308Z',
        stops: [],
        duration: 200
      }
    ]
  },
  {
    carrier: 'ACA',
    price: 25007,
    segments: [
      {
        origin: 'AID',
        destination: 'AIE',
        date: '2020-05-22T10:34:37.308Z',
        stops: ['AIH'],
        duration: 300
      },
      {
        origin: 'AID',
        destination: 'AIE',
        date: '2020-05-23T17:22:00.308Z',
        stops: ['AIH'],
        duration: 300
      }
    ]
  },
  {
    carrier: 'ACA',
    price: 29551,
    segments: [
      {
        origin: 'AID',
        destination: 'AIE',
        date: '2020-05-26T10:34:37.308Z',
        stops: ['AIH'],
        duration: 100
      },
      {
        origin: 'AID',
        destination: 'AIE',
        date: '2020-05-28T17:22:00.308Z',
        stops: [],
        duration: 100
      }
    ]
  }
];

describe('AppSortingPipe', () => {
  let pipe: AppSortingPipe;
  let sortedTickets: Ticket[];

  beforeEach(() => {
    pipe = new AppSortingPipe();
    sortedTickets = [...tickets];
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform()', () => {
    it('should sort tickets by price', () => {
      expect(pipe.transform(sortedTickets, 'price')[0]).toEqual(tickets[1]);
      expect(pipe.transform(sortedTickets, 'price')[1]).toEqual(tickets[2]);
      expect(pipe.transform(sortedTickets, 'price')[2]).toEqual(tickets[0]);
    });

    it('should sort tickets by speed', () => {
      expect(pipe.transform(sortedTickets, 'speed')[0]).toEqual(tickets[2]);
      expect(pipe.transform(sortedTickets, 'speed')[1]).toEqual(tickets[0]);
      expect(pipe.transform(sortedTickets, 'speed')[2]).toEqual(tickets[1]);
    });

    it('should not sort tickets in case of improper sorting parameter', () => {
      expect(pipe.transform(sortedTickets, 'unknown parameter')).toEqual(tickets);
    });
  });
});
