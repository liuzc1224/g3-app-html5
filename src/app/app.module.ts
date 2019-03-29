import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, APP_INITIALIZER } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ShareModule } from '../share/share.module';
import { JokesProvider } from './load.config';
import { jokesProviderFactory } from './config.service';

const I18nLoader = function (http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      iconMode: 'ios',
      mode: 'ios',
      tabsHideOnSubPages: 'true',
      scrollAssist: true
    }),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (I18nLoader),
        deps: [HttpClient]
      }
    }),
    ShareModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    JokesProvider,
    {
      provide: APP_INITIALIZER,
      useFactory: jokesProviderFactory,
      deps: [JokesProvider],
      multi: true
    },
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
