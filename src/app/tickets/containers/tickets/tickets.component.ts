import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from 'rxjs';

import {Ticket} from '../../../core/models/ticket.model';
import {TicketsService} from '../../services/tickets.service';
import {LoaderService} from '../../../core/services/loader.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketsComponent {
  tickets$: Observable<Ticket[]> = this.ticketsService.tickets;
  isShowing$: Observable<boolean> = this.loaderService.isShowing;

  constructor(
    private ticketsService: TicketsService,
    private loaderService: LoaderService
  ) {
    this.ticketsService.getAllTickets();
  }

  onSorting(sortingParam: string): void {
    this.ticketsService.sortTickets(sortingParam);
  }

  onFiltering(filters: number[]): void {
    this.ticketsService.filterTickets(filters);
  }
}
