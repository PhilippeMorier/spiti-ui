// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

import { SpecReporter } from 'jasmine-spec-reporter';
import { Config } from 'protractor';
import { register } from 'ts-node';

export const config: Config = {
  // https://github.com/angular/angularfire2/issues/779
  // Increase timeout because of 'AngularFireModule.initializeApp()'
  // sets up a 30 second timeout which protractor will wait for.
  // Possible alternative:
  // https://github.com/angular/angularfire2/issues/225#issuecomment-318490125
  allScriptsTimeout: 32000,
  baseUrl: 'http://localhost:8080/',
  beforeLaunch: () => {
    register({
      project: 'e2e/tsconfig.e2e.json',
    });
  },
  directConnect: true,
  framework: 'jasmine',
  jasmineNodeOpts: {
    defaultTimeoutInterval: 32000,
    print: () => {/* */},
    showColors: true,
  },
  multiCapabilities: [
    // Disabled Firefox due:
    // - https://github.com/mozilla/geckodriver/issues/529
    // - https://github.com/angular/protractor/issues/4253
    // {
    //   'browserName': 'firefox',
    // },
    {
      'browserName': 'chrome',
      'chromeOptions': {
        'args': [ 'headless', 'no-sandbox' ],
      },
    },
  ],
  specs: [
    './e2e/**/*.e2e-spec.ts',
  ],
  onPrepare(): void {
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  },
};
