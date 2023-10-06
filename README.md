postinstall-bundle
==================

This is a [postinstall](http://github.com/kapouer/postintall) command plugin.

It runs a bundler (currently rollup) on input, and outputs in iife format.

Usage
-----

The plugin can be called directly, or through `postinstall`.

Directly:

```js
require('postinstall-bundle')(inputs, output, options).then(function() {

});
```

Options
-------

- name: global name for exported symbols
- format: amd, cjs, es, iife, umd, system, ... defaults to iife
- replace: STRING:VALUE (option can be passed multiple times)
- extend: extend or replace global name
