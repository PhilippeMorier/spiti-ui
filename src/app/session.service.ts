import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SessionService {
  public currentlySignedInUser(): Observable<User> {
    return this.authenticationService.authState
      .map((user: firebase.User) => new User(user));
  }

  public constructor(public authenticationService: AngularFireAuth) {
  }

  public signIn(email: string, password: string): Observable<User> {
    return Observable
      .fromPromise(this.authenticationService.auth.signInWithEmailAndPassword(email, password))
      .map((user: firebase.User) => new User(user))
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

export class User {
  public displayName?: string;
  public email?: string;
  public uid: string;

  public constructor(fireBaseUser: firebase.User) {
    if (fireBaseUser.displayName) {
      this.displayName = fireBaseUser.displayName;
    }
    if (fireBaseUser.email) {
      this.email = fireBaseUser.email;
    }
    this.uid = fireBaseUser.uid;
  }
}
