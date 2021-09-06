const rollup = require('rollup');
const rollupResolve = require('@rollup/plugin-node-resolve');
const rollupCommonjs = require('@rollup/plugin-commonjs');
const rollupJson = require('@rollup/plugin-json');

module.exports = function (input, output, opts) {
	return rollup.rollup({
		input: input,
		context: 'window',
		plugins: [
			rollupCommonjs(),
			rollupResolve.nodeResolve({ browser: true }),
			rollupJson()
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
