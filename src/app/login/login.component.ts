import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'spt-login',
  styleUrls: [ './login.component.scss' ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public user: Observable<firebase.User>;

  public constructor(public authenticationService: AngularFireAuth) {
    this.user = authenticationService.authState;
  }

  public throwErrorForSentry(): void {
    throw new Error('Catch this, sentry!');
  }

  public signIn(email: string, password: string): void {
    this.authenticationService.auth
      .signInWithEmailAndPassword(email, password)
      .then((user: firebase.User) => console.log(user));
  }

  public signOut(): void {
    this.authenticationService.auth.signOut();
  }
}
