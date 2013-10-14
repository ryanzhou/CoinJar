'use strict';

var Coinjar = require('../../lib/coinjar');

module.exports['personal_account'] = {
  setUp: function(done) {
    this.auth_token = 'sFMzjhnp633sFzgzUMDfN6kVxkY9EWCe6NxiwzqQyBXnqGpv';
    this.coinjar = new Coinjar({ auth_token: this.auth_token, sandbox: true});
    done();
  },
  'account_should_exist': function(test) {
    test.ok(this.coinjar.personal.account, 'account object should exist');
    test.done();
  },
  'account_api_call_should_have_response': function(test) {
    this.coinjar.personal.account(function (error, response) {
      var result = error ? test.ok(false, error) : test.ok(response);
      test.done(result);
    });
  },
  'account_user_should_have_available_balance': function(test) {
    this.coinjar.personal.account(function (error, response) {
      var result = error ? test.ok(false, error) : test.ok(response.available_balance);
      test.done(result);
    });
  },
  'account_user_should_have_email': function(test) {
    this.coinjar.personal.account(function (error, response) {
      var result = error ? test.ok(false, error) : test.ok(response.email);
      test.done(result);
    });
  },
  'account_user_should_have_full_name': function(test) {
    this.coinjar.personal.account(function (error, response) {
      var result = error ? test.ok(false, error) : test.ok(response.full_name);
      test.done(result);
    });
  },
  'account_user_should_have_unconfirmed_balance': function(test) {
    this.coinjar.personal.account(function (error, response) {
      var result = error ? test.ok(false, error) : test.ok(response.unconfirmed_balance);
      test.done(result);
    });
  },
  'account_user_should_have_uuid': function(test) {
    this.coinjar.personal.account(function (error, response) {
      var result = error ? test.ok(false, error) : test.ok(response.uuid);
      test.done(result);
    });
  }
};