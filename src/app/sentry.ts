import { ErrorHandler, Inject, Injectable, InjectionToken } from '@angular/core';
import * as ravenJs from 'raven-js';

import { environment } from '../environments/environment';
import { Fullstory } from './fullstory';

export const RAVEN = new InjectionToken('Raven');

@Injectable()
export class Sentry extends ErrorHandler {
  public constructor(
    @Inject(RAVEN) private readonly raven: typeof ravenJs,
    private readonly fullstory: Fullstory,
  ) {
    super();
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
          fullstorySessionUrl: this.fullstory.getSessionUrl(),
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
