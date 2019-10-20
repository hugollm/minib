# MiniB

Minimalist bundler for web applications.

[![npm version](https://badge.fury.io/js/minib.svg)](https://badge.fury.io/js/minib)


## Install

MiniB is available on npm:

    npm i -D minib


## Overview

MiniB reads tasks from `minib.config.js` at the root of your project.
Here's an example of a simple TypeScript + Sass config:

```js
module.exports = {

    Index: {
        dev: 'mkdir -p .dev && rm -rf .dev/* && cp src/index.html .dev/index.html',
        build: 'mkdir -p dist && rm -rf dist/* && cp src/index.html dist/index.html',
        watch: 'src/index.html',
        reload: 'page',
    },

    TypeScript: {
        after: 'Index',
        dev: 'tsc src/index.ts --outFile .dev/index.js --sourceMap',
        build: `tsc src/index.ts --outFile dist/index.js`,
        watch: 'src/*.ts',
        reload: 'page',
    },

    Sass: {
        after: 'Index',
        dev: 'sass src/index.scss .dev/index.css --source-map',
        build: `sass src/index.scss dist/index.css --no-source-map`,
        watch: 'src/*.scss',
        reload: 'styles',
    },
};
```

Then you just need to call the `dev` and `build` commands on your `package.json`:

```js
{
    // ...
    "scripts": {
        "start": "minib dev .dev",
        "build": "minib build"
    }
}
```
