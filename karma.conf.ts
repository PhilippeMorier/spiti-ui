// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html
import * as karma from 'karma';
import * as karmaChromeLauncher from 'karma-chrome-launcher';
import * as karmaCoverageIstanbulReporter from 'karma-coverage-istanbul-reporter';
import * as karmaFirefoxLauncher from 'karma-firefox-launcher';
import * as karmaJasmine from 'karma-jasmine';
import * as karmaJasmineHtmlReporter from 'karma-jasmine-html-reporter';
import * as karmaMochaReporter from 'karma-mocha-reporter';
// tslint:disable-next-line:no-require-imports no-var-requires
const angularCliPluginsKarma = require('@angular/cli/plugins/karma.js');

module.exports = function (config: karma.Config): void {
  config.set({
    angularCli: {
      environment: 'development',
    },
    autoWatch: true,
    basePath: '',
    browsers: ['Chrome', 'Firefox'],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    colors: true,
    coverageIstanbulReporter: {
      fixWebpackSourcePaths: true,
      reports: ['html', 'lcovonly'],
    },
    // https://github.com/karma-runner/karma-chrome-launcher/issues/83#issuecomment-280423282
    customLaunchers: {
      HeadlessChrome: {
        base: 'Chrome',
        flags: ['--headless', '--disable-gpu', '--remote-debugging-port=9222'],
      },
    },
    files: [
      {pattern: './src/test.ts', watched: false},
      {
        included: true,
        pattern: './node_modules/@angular/material/prebuilt-themes/deeppurple-amber.css',
        watched: false,
      },
    ],
    frameworks: ['jasmine', '@angular/cli'],
    logLevel: config.LOG_INFO,
    mime: {
      'text/x-typescript': ['ts', 'tsx'],
    },
    plugins: [
      karmaJasmine,
      karmaChromeLauncher,
      karmaFirefoxLauncher,
      karmaJasmineHtmlReporter,
      karmaMochaReporter,
      karmaCoverageIstanbulReporter,
      angularCliPluginsKarma,
    ],
    port: 9876,
    preprocessors: {
      './src/test.ts': ['@angular/cli'],
    },
    reporters: config.angularCli && config.angularCli.codeCoverage
      ? ['progress', 'coverage-istanbul']
      : ['progress', 'kjhtml', 'mocha'],
    singleRun: false,
  });
};
