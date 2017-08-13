import { FirebaseAppConfig } from 'angularfire2';

export interface Environment {
  firebase: FirebaseAppConfig;
  name: 'DEVELOPMENT' | 'STAGING' | 'PRODUCTION';
  production: boolean;
}
