import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdIconModule,
  MdInputModule,
  MdToolbarModule,
  MdTooltipModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { environment } from '../environments/environment-source';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Fullstory } from './integrations/fullstory';
import { Sentry, SENTRY_PROVIDERS } from './integrations/sentry';
import { LoginComponent } from './login/login.component';
import { SessionService } from './session.service';
import { FormHostDirective } from './shared/form/form-host.directive';
import { FormComponent } from './shared/form/form.component';
import { InputComponent } from './shared/form/input/input.component';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    LoginComponent,
    FormComponent,
    InputComponent,
    FormHostDirective,
  ],
  entryComponents: [ InputComponent ],
  imports: [
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
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
    MdTooltipModule,
    ReactiveFormsModule,
  ],
  providers: [
    AngularFireAuth,
    AngularFireDatabase,
    Fullstory,
    ...SENTRY_PROVIDERS,
    { provide: ErrorHandler, useClass: Sentry },
    SessionService,
  ],
})
export class AppModule {
  public constructor(fullstory: Fullstory, sentry: Sentry) {
    if (environment.production) {
      fullstory.init();
      sentry.init();
    }
  }
}
