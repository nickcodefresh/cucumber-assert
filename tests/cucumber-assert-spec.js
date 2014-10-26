var cucumberAssert = require('../index.js');
var assert = require('assert');

describe('cucumber-assert tests', function() {
	var cucumberCallback = function() {

	};

	cucumberCallback.fail = function() {

	};

	var callbackSpy = {
		callback: cucumberCallback
	};

	describe('#equal', function() {
		it('calls the actual assert with all the params', function () {
			spyOn(assert, 'equal');

			var actual = 'someRandomString';
			var expected = 'someRandomString';
			var message = 'Some failure message';

			cucumberAssert.equal(actual, expected, callbackSpy.callback, message);
			expect(assert.equal).toHaveBeenCalledWith(actual, expected, message);
		});

		it('calls the callback function', function() {
			spyOn(callbackSpy, 'callback');

			cucumberAssert.equal('Heyyyyy, hermano.', 'Heyyyyy, hermano.', callbackSpy.callback, 'There are dozens of us! DOZENS!');
			expect(callbackSpy.callback).toHaveBeenCalled();
		});

		it('calls the fail callback when assert was not successful', function() {
			spyOn(callbackSpy.callback, 'fail');
			cucumberAssert.equal('Big Bear', 'Bob Loblaw Law Blog.', callbackSpy.callback);
			expect(callbackSpy.callback.fail).toHaveBeenCalled();
		});
	});
});