import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'rxjs/add/observable/fromPromise';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SessionService {
  public currentlySignedInUser: Observable<User>;

  public constructor(public authenticationService: AngularFireAuth) {
    this.currentlySignedInUser = authenticationService.authState;
  }

  public signIn(email: string, password: string): Observable<User> {
    return Observable
      .fromPromise(this.authenticationService.auth.signInWithEmailAndPassword(email, password))
      .first();
  }

  public signOut(): Observable<void> {
    return Observable
      .fromPromise(this.authenticationService.auth.signOut())
      .first();
  }
}

interface User extends firebase.UserInfo {
}
