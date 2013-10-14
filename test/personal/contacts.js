'use strict';

var Coinjar = require('../../lib/coinjar');

module.exports['personal_contacts'] = {
  setUp: function(done) {
    this.auth_token = 'sFMzjhnp633sFzgzUMDfN6kVxkY9EWCe6NxiwzqQyBXnqGpv';
    this.coinjar = new Coinjar({ auth_token: this.auth_token, sandbox: true});
    done();
  },
  'contacts_should_exist': function(test) {
    test.ok(this.coinjar.personal.contacts, 'contacts object should exist');
    test.done();
  },
  'contacts_list_api_call_should_have_response': function(test) {
    this.coinjar.personal.contacts(function (error, response) {
      var result = error ? test.ok(false, error) : test.ok(response);
      test.done(result);
    }, 2, 0); // limit [optional], offset [optional]
  },
  'contacts_get_api_call_should_have_response': function(test) {
    this.coinjar.personal.contacts('690a1aab-639e-45cc-b68e-ed73d6e0c7a6', function (error, response) {
      var result = error ? test.ok(false, error) : test.ok(response);
      test.done(result);
    });
  }
//  // uncomment to integration test the create contact functionality
//  ,'contacts_create_api_call_should_have_response': function(test) {
//    this.coinjar.personal.contacts.create(function (error, response) {
//      var result = error ? test.ok(false, error) : test.ok(response);
//      test.done(result);
//    }, 'mozFyrt6Btrb7s6dKjxceqX2AHWS6fETKu', 'jim lyndon'); // label [optional]
//  }
//  // uncomment and provide a valid UUID to integration test the delete contact functionality
//  ,'contacts_delete_api_call_should_have_204_response': function(test) {
//    this.coinjar.personal.contacts.delete('041a7982-6b6c-4a93-9520-a3ad42d759ea', function (error, response) {
//      var result = error ? test.ok(false, error) : test.equal(response, 204, 'res.status should equal 204 No content.');
//      test.done(result);
//    });
//  }
};