import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AppDurationPipe} from './pipes/app-duration.pipe';
import {AppJoinPipe} from './pipes/app-join.pipe';
import {AppCurrencyPipe} from './pipes/app-currency.pipe';
import {AppFilteringPipe} from './pipes/app-filtering.pipe';
import {AppSortingPipe} from './pipes/app-sorting.pipe';

@NgModule({
  declarations: [
    AppDurationPipe,
    AppJoinPipe,
    AppCurrencyPipe,
    AppFilteringPipe,
    AppSortingPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AppDurationPipe,
    AppJoinPipe,
    AppCurrencyPipe,
    AppFilteringPipe,
    AppSortingPipe
  ],
  providers: [
    AppFilteringPipe,
    AppSortingPipe
  ]
})
export class SharedModule {
}
