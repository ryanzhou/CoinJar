/**
 * Module dependencies
 */
var request = require('superagent'),
  util = require('../utilty');

/**
 * @name isResponseError
 * @description Common error facility.
 *
 * @param {Object} response
 * @param {Function} callback
 * @returns {boolean} False if `response` has no error and user object.
 */
function isResponseError(response, callback) {
  if(response.error) {
    callback(new Error('Coinjar merchant orders api returned error: ' + response.error));
    return true;
  }
  if(!response.body || !(response.body.orders || response.body.order)) {
    callback(new Error('Coinjar merchant orders api returned error: No response body.'));
    return true;
  }
  return false;
}

/**
 * @name get
 * @description
 * Specified Order for merchant account.
 *
 * @params {String} uuid
 * @params {Function} callback
 */
function get(uuid, callback) {
  if(!util.isFunction(callback)) {
    throw new Error('callback must be a function');
  }

  var order_url = this.coinjar.merchant.orders_endpoint + '/',
    resource = this.coinjar.merchant.api_endpoint +
      '/v1/orders/' +
      uuid +
      '.json';

  request.get(resource)
    .auth(this.coinjar.merchant.uuid, this.coinjar.merchant.secret)
    .end(function (response) {
      if(isResponseError(response, callback)) { return; }
      // build the payment page url
      response.body.order.payment_page_url = order_url + response.body.order.uuid;
      return callback(null, response.body.order);
    });
}

/**
 * @name list
 * @description
 * All Orders for merchant account.
 *
 * @params {Function} callback
 * @params {String} limit
 * @params {String} offset
 */
function list(callback, limit, offset) {
  if(!util.isFunction(callback)) {
    throw new Error('callback must be a function');
  }

  var resource = this.coinjar.merchant.api_endpoint + '/v1/orders.json',
    order_url = this.coinjar.merchant.orders_endpoint + '/',
    query = {};

  if(limit) { query.limit = limit; }
  if(offset) { query.offset = offset; }

  request.get(resource)
    .auth(this.coinjar.merchant.uuid, this.coinjar.merchant.secret)
    .query(query)
    .end(function (response) {
      if(isResponseError(response, callback)) { return; }
      // build the payment page url for each order object
      var i = response.body.orders.length;
      while (i--) {
        response.body.orders[i].payment_page_url = order_url + response.body.orders[i].uuid;
      }
      return callback(null, response.body.orders);
    });
}

/**
 * @name create
 * @description
 * Create a new Order for merchant account.
 *
 * @params {String} currency 3-character ISO code (BTC, AUD, USD, etc.)
 * @params {String} merchant_invoice
 * @params {String} merchant_reference
 * @params {String} notify_url
 * @params {String} return_url
 * @params {String} cancel_url
 * @params {String} order_items_array - an array of order_items:
 *  * order_items_array {Object} with three properties:
 *  * @params {String} name
 *  * @params {String} quantity
 *  * @params {String} amount
 *
 * @params {Function} callback
 */
function create(currency, merchant_invoice, merchant_reference, notify_url, return_url, cancel_url, order_items_array, callback) {
  if(!util.isFunction(callback)) {
    throw new Error('callback must be a function');
  }

  var order_url = this.coinjar.merchant.orders_endpoint + '/',
    resource = this.coinjar.merchant.api_endpoint + '/v1/orders.json',
    query = {
      order : {}
    };

  // build request parameters
  if(currency) { query.order.currency = currency; }
  if(merchant_invoice) { query.order.merchant_invoice = merchant_invoice; }
  if(merchant_reference) { query.order.merchant_reference = merchant_reference; }
  if(notify_url) { query.order.notify_url = notify_url; }
  if(return_url) { query.order.return_url = return_url; }
  if(cancel_url) { query.order.cancel_url = cancel_url; }
  if(order_items_array) { query.order.order_items_attributes = order_items_array; }

  request.post(resource)
    .auth(this.coinjar.merchant.uuid, this.coinjar.merchant.secret)
    .send(query)
    .end(function (response) {
      if(isResponseError(response, callback)) { return; }
      // build the payment page url
      response.body.order.payment_page_url = order_url + response.body.order.uuid;
      return callback(null, response.body.order);
    });
}

/**
 * @name Orders
 * @description constructor
 *
 * @returns function that can make the API calls.
 */
function Orders (coinjar) {
  var self = this;
  self.coinjar = coinjar;

  var result = function() {
    if(util.isFunction(arguments[0])) {
      list.apply(self, arguments); // callback, limit, offset
    }
    else {
      get.apply(self, arguments); // id, callback
    }
  };

  result.create = function(cuurency, merchant_invoice, merchant_reference, notify_url, return_url, cancel_url, order_items_array, callback) {
    create.call(self, cuurency, merchant_invoice, merchant_reference, notify_url, return_url, cancel_url, order_items_array, callback);
  };

  return result;
}

/**
 * Module exports
 */
module.exports = Orders;