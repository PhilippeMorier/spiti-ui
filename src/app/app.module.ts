import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdIconModule,
  MdInputModule,
  MdToolbarModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Fullstory } from './fullstory';
import { LoginComponent } from './login/login.component';
import { Sentry, SENTRY_PROVIDERS } from './sentry';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MdCardModule,
    MdCheckboxModule,
    MdButtonModule,
    MdIconModule,
    MdInputModule,
    MdToolbarModule,
  ],
  providers: [
    Fullstory,
    ...SENTRY_PROVIDERS,
    { provide: ErrorHandler, useClass: Sentry },
  ],
})
export class AppModule {
  public constructor(
    private readonly fullstory: Fullstory,
    private readonly sentry: Sentry,
  ) {
    if (environment.production) {
      fullstory.init();
      sentry.init();
    }
  }
}
