'use strict';

var Coinjar = require('../../lib/coinjar');

module.exports['personal_bitcoin_addresses'] = {
  setUp: function(done) {
    this.auth_token = 'sFMzjhnp633sFzgzUMDfN6kVxkY9EWCe6NxiwzqQyBXnqGpv';
    this.coinjar = new Coinjar({ auth_token: this.auth_token, sandbox: true});
    done();
  },
  'bitcoin_addresses_should_exist': function(test) {
    test.ok(this.coinjar.personal.bitcoin_addresses, 'bitcoin_addresses object should exist');
    test.done();
  },
  'bitcoin_addresses_list_api_call_should_have_response': function(test) {
    this.coinjar.personal.bitcoin_addresses(function (error, response) {
      var result = error ? test.ok(false, error) : test.ok(response);
      test.done(result);
    }, 2, 0); // limit [optional], offset [optional]
  },
  'bitcoin_addresses_get_api_call_should_have_response': function(test) {
    this.coinjar.personal.bitcoin_addresses('n3ZJ4yJSGSVBWBZF7xrKXVFzBmxqGRfoqZ', function (error, response) {
      var result = error ? test.ok(false, error) : test.ok(response);
      test.done(result);
    });
  }
//  // uncomment to integration test the create bitcoin address functionality
//  ,'bitcoin_addresses_create_api_call_should_have_response': function(test) {
//    this.coinjar.personal.bitcoin_addresses.create(function (error, response) {
//      var result = error ? test.ok(false, error) : test.ok(response);
//      test.done(result);
//    }, 'some label'); // label [optional]
//  }
};