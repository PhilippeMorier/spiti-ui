import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from './model/user.model';
import { SessionService } from './session.service';

@Component({
  selector: 'spt-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  public user: Observable<User>;

  public constructor(session: SessionService) {
    this.user = session.currentlySignedInUser();
  }
}
