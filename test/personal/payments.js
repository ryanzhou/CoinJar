'use strict';

var Coinjar = require('../../lib/coinjar');

module.exports['personal_payments'] = {
  setUp: function(done) {
    this.auth_token = 'sFMzjhnp633sFzgzUMDfN6kVxkY9EWCe6NxiwzqQyBXnqGpv';
    this.coinjar = new Coinjar({ auth_token: this.auth_token, sandbox: true});
    done();
  },
  'payments_should_exist': function(test) {
    var result = test.ok(this.coinjar.personal.payments, 'payments object should exist');
    test.done(result);
  },
  'payments_list_api_call_should_have_response': function(test) {
    this.coinjar.personal.payments(function (error, response) {
      var result = error ? test.ok(false, error) : test.ok(response);
      test.done(result);
    }, 2, 0); // limit [optional], offset [optional]
  },
  'payments_get_api_call_should_have_response': function(test) {
    this.coinjar.personal.payments('d3281ccf-3069-4d86-a396-68784553a7f2', function (error, response) {
      var result = error ? test.ok(false, error) : test.ok(response);
      test.done(result);
    });
  }
//  // uncomment to integration test the create contact functionality
//  ,'payments_create_api_call_should_have_response': function(test) {
//    this.coinjar.personal.payments.create(function (error, response) {
//      var result = error ? test.ok(false, error) : test.ok(response);
//      test.done(result);
//    }, 'mozFyrt6Btrb7s6dKjxceqX2AHWS6fETKu',.02, 'paying for yet another pizza');
//    // payee [required], amount [required], reference [optional]
//  }
//  // uncomment and use a uuid for unconfirmed payment to integration test the confirm payment functionality
//  ,'payments_confirm_payment_api_call_should_have_response': function(test) {
//    this.coinjar.personal.payments.confirm('d3281ccf-3069-4d86-a396-68784553a7f2', function (error, response) {
//      var result = error ? test.ok(false, error) : test.ok(response);
//      test.done(result);
//    });
//  }
};