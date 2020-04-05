import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AppDurationPipe} from './pipes/app-duration.pipe';
import {AppJoinPipe} from './pipes/app-join.pipe';
import {AppFilteringPipe} from './pipes/app-filtering.pipe';
import {AppSortingPipe} from './pipes/app-sorting.pipe';
import {LoaderComponent} from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppDurationPipe,
    AppJoinPipe,
    AppFilteringPipe,
    AppSortingPipe,
    LoaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AppDurationPipe,
    AppJoinPipe,
    AppFilteringPipe,
    AppSortingPipe,
    LoaderComponent
  ],
  providers: [
    AppFilteringPipe,
    AppSortingPipe
  ]
})
export class SharedModule {
}
