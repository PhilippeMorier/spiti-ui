import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SessionService, User } from '../session.service';

@Component({
  selector: 'spt-login',
  styleUrls: [ './login.component.scss' ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public user: Observable<User>;

  public constructor(
    private readonly session: SessionService,
  ) {
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
