import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AppRoute } from '../app-route.enum';
import { User } from '../model/user.model';
import { SessionService } from '../session.service';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(
    private readonly session: SessionService,
    private readonly router: Router,
  ) {
  }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {

    return this.session
               .currentlySignedInUser()
               .first()
               .map((user: User) => {
                 if (!user) {
                   this.router.navigate([ AppRoute.SignIn ]);
                   return false;
                 }

                 return true;
               });
  }
}
