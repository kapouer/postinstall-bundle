postinstall-browserify
======================

This is a [postinstall](http://github.com/kapouer/postintall) command plugin.

It runs `browserify` on input and accepts options.

Usage
-----

The plugin can be called directly, or through `postinstall`.

Directly:
```
require('postinstall-browserify')(inputs, output, options).then(function() {
	// done
});
```

Options
=======

All options (command-line or json style) are passed directly to browserify.

