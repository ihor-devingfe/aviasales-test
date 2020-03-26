import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TicketsRoutingModule} from './tickets.routing-module';
import {TicketsComponent} from './containers/tickets/tickets.component';
import { TransferFilterComponent } from './components/transfer-filter/transfer-filter.component';
import { TicketComponent } from './components/ticket/ticket.component';

@NgModule({
  declarations: [
    TicketsComponent,
    TransferFilterComponent,
    TicketComponent
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule
  ],
  providers: []
})
export class TicketsModule {
}
