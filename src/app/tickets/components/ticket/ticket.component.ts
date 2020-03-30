import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

import {Ticket} from '../../../core/models/ticket.model';

const SECONDS = 60;
const MILLISECONDS = 1000;

const pluralMap = {
  '=0': 'Без пересадок',
  '=1': '1 пересадка',
  other: '# пересадки',
};

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketComponent {
  @Input() ticket: Ticket;
  pluralMap = pluralMap;
  CDN = 'http://pics.avs.io/99/36/';

  getArrivalTime(flightIndex: number): string {
    const departureTime = new Date(this.ticket.segments[flightIndex].date).getTime();

    const flightTime = this.ticket.segments[flightIndex].duration * SECONDS * MILLISECONDS;

    return new Date(departureTime + flightTime).toISOString();
  }
}
