import { ErrorHandler, Inject, Injectable, InjectionToken } from '@angular/core';
import * as ravenJs from 'raven-js';

import { environment } from '../environments/environment-source';
import { SessionService, User } from './session.service';

export const RAVEN = new InjectionToken('Raven');

@Injectable()
export class Sentry extends ErrorHandler {
  public constructor(
    @Inject(RAVEN) private readonly raven: typeof ravenJs,
    private readonly session: SessionService,
  ) {
    super();

    this.session
      .currentlySignedInUser
      .subscribe((user: User) => {
          if (user) {
            this.raven.setUserContext({
              email: user.email,
              id: user.uid,
              username: user.displayName,
            });
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
}

export const SENTRY_PROVIDERS = [
  Sentry,
  {
    provide: RAVEN,
    useValue: ravenJs,
  },
];
