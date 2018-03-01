import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../environments/environment-source';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './core/auth.guard';
import { LetDirective } from './core/let.directive';
import { Fullstory } from './integrations/fullstory';
import { Sentry, SENTRY_PROVIDERS } from './integrations/sentry';
import { SessionService } from './session.service';
import { InputComponent } from './shared/form/control/input/input.component';
import { FormControlHostDirective } from './shared/form/form-control-host.directive';
import { FormComponent } from './shared/form/form.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    FormComponent,
    InputComponent,
    FormControlHostDirective,
    LetDirective,
  ],
  entryComponents: [ InputComponent ],
  imports: [
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthGuard,
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
