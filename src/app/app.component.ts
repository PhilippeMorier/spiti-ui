import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppRoute } from './app-route.enum';
import { User } from './model/user.model';
import { SessionService } from './session.service';

@Component({
  selector: 'spt-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  public appRoutes: typeof AppRoute = AppRoute;
  public user: Observable<User | undefined>;

  public constructor(session: SessionService) {
    this.user = session.currentlySignedInUser();
  }
}
