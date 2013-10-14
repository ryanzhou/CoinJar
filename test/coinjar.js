'use strict';

var Coinjar = require('../lib/coinjar');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

module.exports['personal_auth_token'] = {
  setUp: function(done) {
    this.auth_token = 'asdf';
    this.coinjar = new Coinjar({ auth_token: this.auth_token });
    done();
  },
  'auth_token': function(test) {
    test.equal(this.auth_token, this.coinjar.personal.auth_token, 'should return correct key');
    test.done();
  }
};