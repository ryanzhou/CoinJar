'use strict';

var Coinjar = require('../../lib/coinjar');

module.exports['fair_rate'] = {
  setUp: function(done) {
    this.auth_token = 'sFMzjhnp633sFzgzUMDfN6kVxkY9EWCe6NxiwzqQyBXnqGpv';
    this.coinjar = new Coinjar({ auth_token: this.auth_token, sandbox: true});
    done();
  },
  'fair_rate_should_exist': function(test) {
    var result = test.ok(this.coinjar.personal.fair_rate, 'fair rate object should exist');
    test.done(result);
  },
  'fair_rate_get_api_call_should_have_response': function(test) {
    this.coinjar.personal.fair_rate('AUD', function (error, response) {
      var result = error ? test.ok(false, error) : test.ok(response);
      test.done(result);
    });
  }
};