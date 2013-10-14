'use strict';

var Coinjar = require('../../lib/coinjar');

module.exports['merchant_orders'] = {
  setUp: function(done) {
    this.uuid = '29b86520-abb5-4105-9e60-a6b8813b8f5e';
    this.secret = '6yodwXnzrVBgYzm2f23wG2JYfONA915_rc_esRX2kN8';
    this.coinjar = new Coinjar({ merchant_uuid: this.uuid, merchant_secret: this.secret, sandbox: true});
    done();
  },
  'bitcoin_orders_should_exist': function(test) {
    test.ok(this.coinjar.merchant.orders, 'orders object should exist');
    test.done();
  },
  'bitcoin_orders_list_api_call_should_have_response': function(test) {
    this.coinjar.merchant.orders(function (error, response) {
      var result = error ? test.ok(false, error) : test.ok(response);
      test.done(result);
    }, 2, 0); // limit [optional], offset [optional]
  },
  'bitcoin_orders_get_api_call_should_have_response': function(test) {
    this.coinjar.merchant.orders('1b6314e9-5530-45dd-8e88-83683a490b56', function (error, response) {
      var result = error ? test.ok(false, error) : test.ok(response);
      test.done(result);
    });
  }
  // uncomment to integration test the create order functionality
  ,'bitcoin_orders_create_api_call_should_have_response': function(test) {
    var currency="BTC",
      merchant_invoice = 1432,
      merchant_reference ="Pizza",
      notify_url ="http://localhost:8888/ipn",
      return_url ="http://localhost:8888/order_paid",
      cancel_url ="http://localhost:8888/order_cancelled",
      order_items = [
        { name: "sauce", quantity: 1, amount: 2 },
        { name: "anchovies", quantity: 20, amount: 0.03 },
        { name: "mushrooms", quantity: 40, amount: 0.01 }
      ];

    this.coinjar.merchant.orders.create(currency, merchant_invoice, merchant_reference, notify_url, return_url,
      cancel_url, order_items, function (error, response) {
      var result = error ? test.ok(false, error) : test.ok(response);
      test.done(result);
    });
  }
};

