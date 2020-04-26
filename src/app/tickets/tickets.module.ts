import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {TicketsRoutingModule} from './tickets.routing-module';
import {TicketsComponent} from './containers/tickets/tickets.component';
import {TransferFilterComponent} from './components/transfer-filter/transfer-filter.component';
import {TicketComponent} from './components/ticket/ticket.component';
import {SortingComponent} from './components/sorting/sorting.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    TicketsComponent,
    TransferFilterComponent,
    TicketComponent,
    SortingComponent
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class TicketsModule {
}
