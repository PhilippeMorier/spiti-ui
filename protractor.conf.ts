// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

import { SpecReporter } from 'jasmine-spec-reporter';
import { Config } from 'protractor';
import { register } from 'ts-node';

export const config: Config = {
  allScriptsTimeout: 11000,
  baseUrl: 'http://localhost:4200/',
  beforeLaunch: () => {
    register({
      project: 'e2e/tsconfig.e2e.json',
    });
  },
  directConnect: true,
  framework: 'jasmine',
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
    print: () => {/* */},
    showColors: true,
  },
  multiCapabilities: [
    // Disabled Firefox due: https://github.com/mozilla/geckodriver/issues/529
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