import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FormConfig } from 'app/shared/form/form.component';
import { User } from '../model/user.model';
import { SessionService } from '../session.service';
import { InputComponent } from '../shared/form/input/input.component';

@Component({
  selector: 'spt-login',
  styleUrls: [ './login.component.scss' ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public user: Observable<User>;
  public config: [FormConfig] = [
    {
      component: InputComponent,
      property: 'displayName',
    },
    {
      component: InputComponent,
      property: 'email',
    },
  ];

  public constructor(private readonly session: SessionService) {
    this.user = this.session.currentlySignedInUser();
  }

  public throwErrorForSentry(): void {
    throw new Error('Catch this, sentry!');
  }

  public signIn(email: string, password: string): void {
    this.session.signIn(email, password);
  }

  public signOut(): void {
    this.session.signOut();
  }

  public setDisplayName(): void {
    this.session.updateDisplayName('Morier');
  }
}
