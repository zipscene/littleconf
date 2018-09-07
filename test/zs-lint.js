// Copyright 2016 Zipscene, LLC
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

let spawn = require('child_process').spawn;
let path = require('path');

describe('Linter', function() {
	it('should not have any linter problems', function(done) {

		this.timeout(60000);

		let finished = false;

		function finish(error) {
			if (finished) return;
			finished = true;
			if (error && typeof error === 'number') {
				throw new Error('Project contains linter errors (exit code ' + error + ')');
			} else if (error instanceof Error) {
				throw error;
			} else if (error) {
				throw new Error('' + error);
			}
			done();
		}

		let lintProc = spawn('node', [ path.join(__dirname, '/../node_modules/.bin/eslint'), '.' ], {
			cwd: path.join(__dirname, '/..')
		});

		lintProc.on('error', function(error) {
			finish(error);
		});

		lintProc.on('exit', function(code, signal) {
			if (code !== null) {
				finish(code || null);
			} else if (signal !== null) {
				finish('Unexpected linter exit: ' + signal);
			} else {
				finish('Unexpected linter exit');
			}
		});

	});
});
