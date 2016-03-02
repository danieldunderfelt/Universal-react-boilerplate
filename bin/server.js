#!/usr/bin/env node
require('babel-register')({
  "presets": ["react", "es2015", "stage-0"],
  "plugins": ["transform-decorators-legacy", "transform-runtime", "add-module-exports"]
});

var path = require('path')
var rootDir = path.resolve(__dirname, '..')
/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false
global.__SERVER__ = true
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production'

if (__DEVELOPMENT__) {
    if (!require('piping')({
            hook: true,
            ignore: /(\/\.|~$|\.json|\.scss$)/i
        })) {
        return
    }
}

require('../src/server')