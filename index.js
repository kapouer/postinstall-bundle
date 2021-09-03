const rollup = require('rollup');
const rollupResolve = require('@rollup/plugin-node-resolve');
const rollupCommonjs = require('@rollup/plugin-commonjs');

module.exports = function (input, output, opts) {
	return rollup.rollup({
		input: input,
		context: 'window',
		plugins: [
			rollupResolve.nodeResolve({ browser: true }),
			rollupCommonjs()
		]
	}).then(function (bundle) {
		return bundle.write({
			format: 'iife',
			file: output,
			name: opts.name
		}).then(function () {
			return bundle.close();
		});
	});
};
