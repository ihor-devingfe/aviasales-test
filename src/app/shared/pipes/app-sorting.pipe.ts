import {Pipe, PipeTransform} from '@angular/core';

import {Ticket} from '../../core/models/ticket.model';

@Pipe({
  name: 'appSorting'
})
export class AppSortingPipe implements PipeTransform {
  private static sortByPrice(tickets: Ticket[]): Ticket[] {
    return tickets.sort((ticket1: Ticket, ticket2: Ticket) => {
      return ticket1.price - ticket2.price;
    });
  }

  private static sortBySpeed(tickets: Ticket[]): Ticket[] {
    return tickets.sort((ticket1: Ticket, ticket2: Ticket) => {
      const flightDuration1 = ticket1.segments
        .reduce((accumulator, ticket) => accumulator + ticket.duration, 0);
      const flightDuration2 = ticket2.segments
        .reduce((accumulator, ticket) => accumulator + ticket.duration, 0);

      return flightDuration1 - flightDuration2;
    });
  }

  transform(tickets: Ticket[], sortingParam: string): Ticket[] {
    switch (sortingParam) {
      case 'price':
        return AppSortingPipe.sortByPrice(tickets);
      case 'speed':
        return AppSortingPipe.sortBySpeed(tickets);
      default:
        return tickets;
    }
  }
}
