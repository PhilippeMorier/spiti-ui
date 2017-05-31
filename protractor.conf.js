"use strict";
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
exports.__esModule = true;
var jasmine_spec_reporter_1 = require("jasmine-spec-reporter");
var ts_node_1 = require("ts-node");
exports.config = {
    allScriptsTimeout: 11000,
    baseUrl: 'http://localhost:4200/',
    beforeLaunch: function () {
        ts_node_1.register({
            project: 'e2e/tsconfig.e2e.json'
        });
    },
    directConnect: true,
    framework: 'jasmine',
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000,
        print: function () { },
        showColors: true
    },
    multiCapabilities: [
        // Disabled Firefox due: https://github.com/mozilla/geckodriver/issues/529
        // {
        //   'browserName': 'firefox',
        // },
        {
            'browserName': 'chrome',
            'chromeOptions': {
                'args': ['headless', 'no-sandbox']
            }
        },
    ],
    specs: [
        './e2e/**/*.e2e-spec.ts',
    ],
    onPrepare: function () {
        jasmine.getEnv().addReporter(new jasmine_spec_reporter_1.SpecReporter({ spec: { displayStacktrace: true } }));
    }
};
