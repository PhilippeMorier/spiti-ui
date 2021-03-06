// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

import { SpecReporter } from 'jasmine-spec-reporter';
import { Config } from 'protractor';
import { register } from 'ts-node';

export const config: Config = {
  allScriptsTimeout: 11000,
  baseUrl: 'http://localhost:8080/',
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
    },
  ],
  specs: [
    './e2e/**/*.e2e-spec.ts',
  ],
  onPrepare(): void {
    register({
      project: 'e2e/tsconfig.e2e.json',
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  },
};
