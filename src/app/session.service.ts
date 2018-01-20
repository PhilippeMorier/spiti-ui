import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User as FirebaseUser } from 'firebase/app';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { User } from './model/user.model';

@Injectable()
export class SessionService {
  public constructor(public readonly authenticationService: AngularFireAuth) {
  }

  public currentlySignedInUser(): Observable<User> {
    return this.authenticationService.authState
      .map((user: FirebaseUser) => (user) ? new User(user) : undefined);
  }

  public signIn(email: string, password: string): Observable<User> {
    return Observable
      .fromPromise(this.authenticationService.auth.signInWithEmailAndPassword(email, password))
      .map((user: FirebaseUser) => new User(user))
      .first();
  }

  public signOut(): Observable<void> {
    return Observable
      .fromPromise(this.authenticationService.auth.signOut())
      .first();
  }

  public updateDisplayName(displayName: string): Observable<User> {
    if (!this.authenticationService.auth.currentUser) {
      return Observable.throw(new Error('No current user available.'));
    }

    return Observable
      .fromPromise(
        this.authenticationService
          .auth
          .currentUser
          .updateProfile({ displayName: displayName, photoURL: null }),
      )
      .first();
  }
}
