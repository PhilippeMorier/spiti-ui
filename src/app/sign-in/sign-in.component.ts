import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../model/user.model';
import { SessionService } from '../session.service';
import { ControlConfig } from '../shared/form/control/control';
import { InputType } from '../shared/form/control/input-type';
import { InputComponent } from '../shared/form/control/input/input.component';

@Component({
  selector: 'spt-sign-in',
  styleUrls: [ './sign-in.component.scss' ],
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {
  public user: Observable<User | undefined>;
  public config: [ ControlConfig ] = [
    {
      component: InputComponent,
      placeholderText: 'Name',
      property: 'displayName',
      type: InputType.TEXT,
    },
    {
      component: InputComponent,
      placeholderText: 'Email',
      property: 'email',
      type: InputType.EMAIL,
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
