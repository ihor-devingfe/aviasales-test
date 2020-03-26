import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppDurationPipe} from './pipes/app-duration.pipe';
import { AppJoinPipe } from './pipes/app-join.pipe';
import { AppCurrencyPipe } from './pipes/app-currency.pipe';

@NgModule({
  declarations: [
    AppDurationPipe,
    AppJoinPipe,
    AppCurrencyPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AppDurationPipe,
    AppJoinPipe,
    AppCurrencyPipe
  ]
})
export class SharedModule {
}
