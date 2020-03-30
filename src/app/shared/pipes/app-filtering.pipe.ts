import {Pipe, PipeTransform} from '@angular/core';

import {Ticket} from '../../core/models/ticket.model';

@Pipe({
  name: 'appFiltering'
})
export class AppFilteringPipe implements PipeTransform {
  transform(tickets: Ticket[], transfers: number[]): Ticket[] {
    return tickets.filter(ticket => {
      const filteredSegments = ticket.segments.filter(segment => {
        return transfers.some(transfer => +transfer === segment.stops.length);
      });

      return filteredSegments.length === 2;
    });
  }
}
