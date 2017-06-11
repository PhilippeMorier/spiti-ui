import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'spt-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  public user: Observable<firebase.User>;

  public constructor(public authenticationService: AngularFireAuth) {
    this.user = authenticationService.authState;
  }
}
