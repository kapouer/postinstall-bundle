const rollup = require('rollup');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const cjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');
const replace = require('@rollup/plugin-replace');

module.exports = async function (input, output, opts) {
	const bundle = await rollup.rollup({
		input: input,
		context: 'window',
		plugins: [
			replace({ preventAssignment: true, values: getReplaces(opts.replace) }),
			cjs(),
			nodeResolve({ browser: true }),
			json()
		]
	});
	await bundle.write({
		format: opts.format || 'iife',
		file: output,
		name: opts.name
	});
	await bundle.close();
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
