import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {registerLocaleData} from '@angular/common';
import ruLocale from '@angular/common/locales/ru';

import {AppComponent} from './containers/app/app.component';
import {LogoComponent} from './components/logo/logo.component';
import {AppRoutingModule} from './app.routing-module';
import {SharedModule} from '../shared/shared.module';

registerLocaleData(ruLocale, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
