import { Component } from '@angular/core';

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
  public user: User = new User();
  public config: [ ControlConfig ] = [ {
    component: InputComponent,
    placeholderText: 'Email',
    property: 'email',
    type: InputType.EMAIL,
  }, {
    component: InputComponent,
    placeholderText: 'Password',
    property: 'password',
    type: InputType.PASSWORD,
  } ];

  public constructor(private readonly session: SessionService) {
  }

  public throwErrorForSentry(): void {
    throw new Error('Catch this, sentry!');
  }

  public signIn(email: string, password: string): void {
    this.session.signIn(email, password);
  }

  public setDisplayName(): void {
    this.session.updateDisplayName('Morier');
  }
}
