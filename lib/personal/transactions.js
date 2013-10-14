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
    callback(new Error('Coinjar personal transactions api returned error: ' + response.error));
    return true;
  }
  if(!response.body || !(response.body.transactions || response.body.transaction)) {
    callback(new Error('Coinjar personal transactions api returned error: No response body.'));
    return true;
  }
  return false;
}

/**
 * @name get
 * @description
 * Specified Transaction for user account.
 *
 * @params {String} uuid
 * @params {Function} callback
 */
function get(uuid, callback) {
  if(!util.isFunction(callback)) {
    throw new Error('callback must be a function');
  }

  var resource = this.coinjar.personal.api_endpoint +
    '/v1/transactions/' +
    uuid +
    '.json';

  request.get(resource)
    .auth(this.coinjar.personal.auth_token)
    .end(function (response) {
      if(isResponseError(response, callback)) { return; }
      return callback(null, response.body.transaction);
    });
}

/**
 * @name list
 * @description
 * All Transactions for user account.
 *
 * @params {Function} callback
 * @params {String} limit
 * @params {String} offset
 */
function list(callback, limit, offset) {
  if(!util.isFunction(callback)) {
    throw new Error('callback must be a function');
  }

  var resource = this.coinjar.personal.api_endpoint + '/v1/transactions.json',
    query = {};

  if(limit) { query.limit = limit; }
  if(offset) { query.offset = offset; }

  request.get(resource)
    .auth(this.coinjar.personal.auth_token)
    .query(query)
    .end(function (response) {
      if(isResponseError(response, callback)) { return; }
      return callback(null, response.body.transactions);
    });
}

/**
 * @name Transactions
 * @description constructor
 *
 * @returns function that can make the API calls.
 */
function Transactions (coinjar) {
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

  return result;
}

/**
 * Module exports
 */
module.exports = Transactions;