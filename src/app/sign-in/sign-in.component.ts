import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppRoute } from '../app-route.enum';
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

  public isSigningIn: boolean = false;

  public constructor(
    private readonly session: SessionService,
    private readonly router: Router,
  ) {
  }

  public throwErrorForSentry(): void {
    throw new Error('Catch this, sentry!');
  }

  public signIn(email: string, password: string): void {
    this.isSigningIn = true;
    this.session
      .signIn(email, password)
      .subscribe(
        () => this.router.navigate([AppRoute.Editor]),
        () => this.isSigningIn = false,
      );
  }

  public setDisplayName(): void {
    this.session.updateDisplayName('Morier');
  }
}
