import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {registerLocaleData} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import ruLocale from '@angular/common/locales/ru';

import {AppComponent} from './containers/app/app.component';
import {LogoComponent} from './components/logo/logo.component';
import {AppRoutingModule} from './app.routing-module';
import {SharedModule} from '../shared/shared.module';
import {httpInterceptorProviders} from '../core/interceptors/interceptors';

registerLocaleData(ruLocale, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
