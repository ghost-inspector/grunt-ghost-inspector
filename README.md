# Grunt Plugin for Ghost Inspector

> Grunt plugin for executing Ghost Inspector automated UI tests.

[![CircleCI](https://circleci.com/gh/ghost-inspector/grunt-ghost-inspector/tree/stable.svg?style=svg)](https://circleci.com/gh/ghost-inspector/grunt-ghost-inspector/tree/stable)

## Getting Started
This plugin requires Grunt `^1.1.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-ghost-inspector --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-ghost-inspector');
```

## The "ghostinspector" task

### Overview
In your project's Gruntfile, add a section named `ghostinspector` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  ghostinspector: {
    options: {
      apiKey: 'api-key',  // The API key for your Ghost Inspector account
    },
    production: {
      suites: ['suite-id-1', 'suite-id-2', ...],  // IDs of any suites to execute
      tests: ['test-id-1', 'test-id-2', ...]  // IDs of any tests to execute
    },
    staging: {
      tests: ['test-id-1', 'test-id-2', ...],
      options: {
        startUrl: 'http://staging.domain.com'  // Override the tests' start URL
      }
    }
  }
});
```

## License

    MIT
