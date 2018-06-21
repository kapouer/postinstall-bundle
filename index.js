const browserify = require("browserify");
const fs = require('fs');

module.exports = function(inputs, output, options) {
	if (inputs.length == 0) return Promise.resolve();

	return new Promise(function(resolve, reject) {
		var out = fs.createWriteStream(output);
		out.on('finish', resolve);
		out.on('error', reject);
		browserify(inputs, options).bundle().pipe(out);
	});
};

