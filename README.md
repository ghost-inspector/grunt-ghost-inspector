# Grunt Plugin for Ghost Inspector

> Grunt plugin for executing Ghost Inspector automated browser tests.

[![Build Status](https://travis-ci.org/ghost-inspector/grunt-ghost-inspector.png)](https://travis-ci.org/ghost-inspector/grunt-ghost-inspector)

## Getting Started
This plugin requires Grunt `~0.4.2`

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
      suites: ['suite-id-1', 'suite-id-2', ...],  // The IDs of any suites to execute
      tests: ['test-id-1', 'test-id-2', ...]  // The IDs of any tests to execute
    }
  }
});
```

## License

    MIT
