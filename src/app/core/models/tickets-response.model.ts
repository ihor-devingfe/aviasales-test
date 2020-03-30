import {Ticket} from './ticket.model';

export interface TicketsResponse {
  tickets: Ticket[];
  stop: boolean;
}
