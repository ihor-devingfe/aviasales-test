import {AppFilteringPipe} from './app-filtering.pipe';
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
        duration: 67
      },
      {
        origin: 'AID',
        destination: 'AIE',
        date: '2020-05-23T17:22:00.308Z',
        stops: ['AIH'],
        duration: 55
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
        duration: 170
      },
      {
        origin: 'AID',
        destination: 'AIE',
        date: '2020-05-28T17:22:00.308Z',
        stops: [],
        duration: 101
      }
    ]
  },
  {
    carrier: 'ACA',
    price: 47663,
    segments: [
      {
        origin: 'AID',
        destination: 'AIE',
        date: '2020-05-26T10:34:37.308Z',
        stops: ['AIH', 'ABL'],
        duration: 200
      },
      {
        origin: 'AID',
        destination: 'AIE',
        date: '2020-05-28T17:22:00.308Z',
        stops: ['ABL'],
        duration: 141
      }
    ]
  },
  {
    carrier: 'AIK',
    price: 33725,
    segments: [
      {
        origin: 'AIK',
        destination: 'AIE',
        date: '2020-05-26T10:34:37.308Z',
        stops: ['AIH', 'ABL'],
        duration: 444
      },
      {
        origin: 'AIK',
        destination: 'AIE',
        date: '2020-05-30T17:22:00.308Z',
        stops: ['ABL', 'AIR', 'AJR'],
        duration: 633
      }
    ]
  },
  {
    carrier: 'AFR',
    price: 72515,
    segments: [
      {
        origin: 'AKB',
        destination: 'AJN',
        date: '2020-07-02T10:34:37.308Z',
        stops: ['AIH', 'ABL', 'AKD'],
        duration: 388
      },
      {
        origin: 'AKB',
        destination: 'AJN',
        date: '2020-07-15T17:22:00.308Z',
        stops: ['ABL', 'AIR', 'AJR'],
        duration: 420
      }
    ]
  },
  {
    carrier: 'AZA',
    price: 72515,
    segments: [
      {
        origin: 'AKV',
        destination: 'AKX',
        date: '2020-07-02T10:34:37.308Z',
        stops: ['AIH', 'ABL', 'AKD'],
        duration: 388
      },
      {
        origin: 'AKV',
        destination: 'AKX',
        date: '2020-07-15T17:22:00.308Z',
        stops: ['ABL'],
        duration: 315
      }
    ]
  },
  {
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
  },
  {
    carrier: 'ACI',
    price: 17051,
    segments: [
      {
        origin: 'ALM',
        destination: 'ALL',
        date: '2020-07-28T10:34:37.308Z',
        stops: ['ABL', 'AKD'],
        duration: 302
      },
      {
        origin: 'ALM',
        destination: 'ALL',
        date: '2020-08-05T17:22:00.308Z',
        stops: ['ABL', 'AKD'],
        duration: 201
      }
    ]
  }
];

describe('AppFilteringPipe', () => {
  let pipe: AppFilteringPipe;

  beforeEach(() => {
    pipe = new AppFilteringPipe();
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform()', () => {
    it('should return all tickets in case of all transfers allowed', () => {
      expect(pipe.transform(tickets, [0, 1, 2, 3])).toEqual(tickets);
    });

    describe('should filter tickets with absent transfers count', () => {
      it('should filter tickets with 0 transfers', () => {
        const withoutZeroTransfers = pipe.transform(tickets, [1, 2, 3]);

        const result = withoutZeroTransfers.filter(ticket => {
          const filteredSegments = ticket.segments.filter(segment => {
            return segment.stops.length === 0;
          });

          return filteredSegments.length;
        });

        expect(result.length).toBe(0);
      });

      it('should filter tickets with 1 transfers', () => {
        const withoutZeroTransfers = pipe.transform(tickets, [0, 2, 3]);

        const result = withoutZeroTransfers.filter(ticket => {
          const filteredSegments = ticket.segments.filter(segment => {
            return segment.stops.length === 1;
          });

          return filteredSegments.length;
        });

        expect(result.length).toBe(0);
      });

      it('should filter tickets with 2 transfers', () => {
        const withoutZeroTransfers = pipe.transform(tickets, [0, 1, 3]);

        const result = withoutZeroTransfers.filter(ticket => {
          const filteredSegments = ticket.segments.filter(segment => {
            return segment.stops.length === 2;
          });

          return filteredSegments.length;
        });

        expect(result.length).toBe(0);
      });

      it('should filter tickets with 3 transfers', () => {
        const withoutZeroTransfers = pipe.transform(tickets, [0, 1, 2]);

        const result = withoutZeroTransfers.filter(ticket => {
          const filteredSegments = ticket.segments.filter(segment => {
            return segment.stops.length === 3;
          });

          return filteredSegments.length;
        });

        expect(result.length).toBe(0);
      });
    });
  });
});
