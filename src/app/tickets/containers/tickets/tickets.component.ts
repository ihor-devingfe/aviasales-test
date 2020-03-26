import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';

import {Ticket} from '../../../core/models/ticket.model';
import {TicketsService} from '../../services/tickets.service';

const ticket: Ticket = {
  price: 80611,
  carrier: 'SU',
  segments: [
    {
      origin: 'MOW',
      destination: 'HKT',
      date: '2020-04-05T07:34:00.000Z',
      stops: ['AUH'],
      duration: 665
    },
    {
      origin: 'MOW',
      destination: 'HKT',
      date: '2020-04-25T06:47:00.000Z',
      stops: [],
      duration: 1602
    }
  ]
};

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketsComponent implements OnInit {
  tickets: Observable<Ticket[]>;

  constructor(private ticketsService: TicketsService) {
    this.tickets = of([ticket]);
  }

  ngOnInit(): void {
  }

}
