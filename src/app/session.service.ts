import { Injectable, Injector, NgZone } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User as FirebaseUser } from 'firebase/app';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { User } from './model/user.model';

@Injectable()
export class SessionService {
  private authenticationService: AngularFireAuth;
  private authState: Observable<FirebaseUser | null>;

  public constructor(
    injector: Injector,
    zone: NgZone,
  ) {
    // https://github.com/angular/protractor/issues/4300#issuecomment-346926872
    zone.runOutsideAngular(() => {
      // https://stackoverflow.com/a/42462579
      this.authenticationService = injector.get(AngularFireAuth);
    });

    this.authState = this.observeInZone(this.authenticationService.authState, zone);
  }

  public currentlySignedInUser(): Observable<User | undefined> {
    return this.authState
      .map((user: FirebaseUser) => (user) ? new User(user) : undefined);
  }

  public createUserWithEmailAndPassword(email: string, password: string): Observable<User> {
    return Observable
      .fromPromise(this.authenticationService.auth.createUserWithEmailAndPassword(email, password))
      .map((user: FirebaseUser) => new User(user))
      .first();
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

  // https://github.com/apollographql/apollo-angular/issues/320#issuecomment-327436087
  private observeInZone<T>(observable: Observable<T>, zone: NgZone): Observable<T> {
    return Observable.create(observer => {
      const onNext = (value) => zone.run(() => observer.next(value));
      const onError = (error) => zone.run(() => observer.error(error));
      const onComplete = () => zone.run(() => observer.complete());
      return observable.subscribe(onNext, onError, onComplete);
    });
  }
}
