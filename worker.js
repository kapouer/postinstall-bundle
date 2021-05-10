const browserify = require('browserify');
const PassThrough = require('stream').PassThrough;
const Path = require('path');

module.exports = function(input, data, output, opts) {
	opts = Object.assign({}, opts, {
		basedir: Path.dirname(input)
	});
	var ps = new PassThrough();
	ps.end(data);
	return new Promise(function(resolve, reject) {
		browserify(ps, opts).bundle(function(err, buf) {
			if (err) {
				const simpleErr = new Error(err.message);
				simpleErr.code = err.code;
				simpleErr.stack = err.stack;
				reject(simpleErr);
			} else resolve({
				data: buf
			});
		});
	});
};
