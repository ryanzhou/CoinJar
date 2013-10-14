'use strict';

var Coinjar = require('../../lib/coinjar');

module.exports['personal_transactions'] = {
  setUp: function(done) {
    this.auth_token = 'sFMzjhnp633sFzgzUMDfN6kVxkY9EWCe6NxiwzqQyBXnqGpv';
    this.coinjar = new Coinjar({ auth_token: this.auth_token, sandbox: true});
    done();
  },
  'transactions_should_exist': function(test) {
    test.ok(this.coinjar.personal.transactions, 'transactions object should exist');
    test.done();
  },
  'transactions_list_api_call_should_have_response': function(test) {
    this.coinjar.personal.transactions(function (error, response) {
      var result = error ? test.ok(false, error) : test.ok(response);
      test.done(result);
    }, 2, 0); // limit [optional], offset [optional]
  }
//  // API bug where find uuid apparently not working on the server side
//  ,'transactions_get_api_call_should_have_response': function(test) {
//    this.coinjar.personal.transactions('a2d8bc72-f0cb-4be5-9607-cdac29889432', function (error, response) {
//      var result = error ? test.ok(false, error) : test.ok(response);
//      test.done(result);
//    });
//  }
};