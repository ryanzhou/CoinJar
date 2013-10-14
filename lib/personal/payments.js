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
    callback(new Error('Coinjar personal payments api returned error: ' + response.error));
    return true;
  }
  if(!response.body || !(response.body.payments || response.body.payment)) {
    callback(new Error('Coinjar personal payments api returned error: No response body.'));
    return true;
  }
  return false;
}

/**
 * @name get
 * @description
 * Specified Payment for user account.
 *
 * @params {String} uuid
 * @params {Function} callback
 */
function get(uuid, callback) {
  if(!util.isFunction(callback)) {
    throw new Error('callback must be a function');
  }

  var resource = this.coinjar.personal.api_endpoint +
    '/v1/payments/' +
    uuid +
    '.json';

  request.get(resource)
    .auth(this.coinjar.personal.auth_token)
    .end(function (response) {
      if(isResponseError(response, callback)) { return; }
      return callback(null, response.body.payment);
    });
}

/**
 * @name list
 * @description
 * All Payments for user account.
 *
 * @params {Function} callback
 * @params {String} limit
 * @params {String} offset
 */
function list(callback, limit, offset) {
  if(!util.isFunction(callback)) {
    throw new Error('callback must be a function');
  }

  var resource = this.coinjar.personal.api_endpoint + '/v1/payments.json',
    query = {};

  if(limit) { query.limit = limit; }
  if(offset) { query.offset = offset; }

  request.get(resource)
    .auth(this.coinjar.personal.auth_token)
    .query(query)
    .end(function (response) {
      if(isResponseError(response, callback)) { return; }
      return callback(null, response.body.payments);
    });
}

/**
 * @name create
 * @description
 * Create a new Payment for user account.
 *
 * @params {Function} callback
 * @params {String} payee
 * @params {String} name
 */
function create(callback, payee, amount, reference) {
  if(!util.isFunction(callback)) {
    throw new Error('callback must be a function');
  }

  var resource = this.coinjar.personal.api_endpoint + '/v1/payments.json',
    query = {
      payment : {}
    };

  if(payee) { query.payment.payee = payee; }
  if(amount) { query.payment.amount = amount; }
  if(reference) { query.payment.reference = reference; }

  request.post(resource)
    .auth(this.coinjar.personal.auth_token)
    .send(query)
    .end(function (response) {
      if(isResponseError(response, callback)) { return; }
      return callback(null, response.body.payment);
    });
}

/**
 * @name confirm
 * @description
 * Confirm a Payment for user account.
 *
 * @params {Function} callback
 */
function confirm(uuid, callback) {
  if(!util.isFunction(callback)) {
    throw new Error('callback must be a function');
  }

  var resource = this.coinjar.personal.api_endpoint +
    '/v1/payments/' +
    uuid +
    '/confirm.json';

  request.post(resource)
    .auth(this.coinjar.personal.auth_token)
    .end(function (response) {
      if(isResponseError(response, callback)) { return; }
      return callback(null, response.body.payment);
    });
}

/**
 * @name Payments
 * @description constructor
 *
 * @returns function that can make the API calls.
 */
function Payments (coinjar) {
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

  result.create = function(callback, payee, amount, reference) {
    create.call(self, callback, payee, amount, reference);
  };

  result.confirm = function(uuid, callback) {
    confirm.call(self, uuid, callback);
  };

  return result;
}

/**
 * Module exports
 */
module.exports = Payments;