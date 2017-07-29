import { ErrorHandler, Inject, Injectable, InjectionToken } from '@angular/core';
import * as ravenJs from 'raven-js';

import { environment } from '../../environments/environment-source';
import { User } from '../model/user.model';
import { SessionService } from '../session.service';

export const RAVEN = new InjectionToken('Raven');

interface RavenUser {
  id?: string;
  username?: string;
  email?: string;
}

@Injectable()
export class Sentry extends ErrorHandler {
  public constructor(
    @Inject(RAVEN) private readonly raven: typeof ravenJs,
    private readonly session: SessionService,
  ) {
    super();

    this.session
      .currentlySignedInUser()
      .subscribe((user: User) => {
          if (user) {
            this.raven.setUserContext(this.convertToRavenUser(user));
          } else {
            this.raven.setUserContext();
          }
        },
      );
  }

  public init(): void {
    this.raven
      .config(
        'https://ecd58504f4644d4483916fd020c5ac28@sentry.io/172951',
        {
          environment: environment.name,
        },
      );
  }

  public handleError(error): void {
    this.raven.captureException(
      error.originalError || error,
      {
        tags: {
        },
      },
    );
    super.handleError(error);
  }

  private convertToRavenUser(user: User): RavenUser {
    const ravenUser: RavenUser = {};
    if (user.email) {
      ravenUser.email = user.email;
    }
    if (user.uid) {
      ravenUser.id = user.uid;
    }
    if (user.displayName) {
      ravenUser.username = user.displayName;
    }

    return ravenUser;
  }
}

export const SENTRY_PROVIDERS = [
  Sentry,
  {
    provide: RAVEN,
    useValue: ravenJs,
  },
];
