const rollup = require('rollup');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const cjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');
const replace = require('@rollup/plugin-replace');

module.exports = function (input, output, opts) {
	return rollup.rollup({
		input: input,
		context: 'window',
		plugins: [
			replace({ preventAssignment: true, values: getReplaces(opts.replace) }),
			cjs(),
			nodeResolve({ browser: true }),
			json()
		]
	}).then(function (bundle) {
		return bundle.write({
			format: opts.format || 'iife',
			file: output,
			name: opts.name
		}).then(function () {
			return bundle.close();
		});
	});
};


function getReplaces(opt) {
	const obj = {};
	if (opt == null) return obj;
	if (!Array.isArray(opt)) opt = [opt];
	for (const str of opt) {
		const parts = str.split(':');
		obj[parts.shift()] = JSON.stringify(parts.join(':'));
	}
	return obj;
}
