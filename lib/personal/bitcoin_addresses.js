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
    callback(new Error('Coinjar personal bitcoin_addresses api returned error: ' + response.error));
    return true;
  }
  if(!response.body || !(response.body.bitcoin_addresses || response.body.bitcoin_address)) {
    callback(new Error('Coinjar personal bitcoin_addresses api returned error: No response body.'));
    return true;
  }
  return false;
}

/**
 * @name get
 * @description
 * Specified Bitcoin Address for user account.
 *
 * @params {String} uuid
 * @params {Function} callback
 */
function get(uuid, callback) {
  if(!util.isFunction(callback)) {
    throw new Error('callback must be a function');
  }

  var resource = this.coinjar.personal.api_endpoint +
    '/v1/bitcoin_addresses/' +
    uuid +
    '.json';

  request.get(resource)
    .auth(this.coinjar.personal.auth_token)
    .end(function (response) {
      if(isResponseError(response, callback)) { return; }
      return callback(null, response.body.bitcoin_address);
    });
}

/**
 * @name list
 * @description
 * All Bitcoin Addresses for user account.
 *
 * @params {Function} callback
 * @params {String} limit
 * @params {String} offset
 */
function list(callback, limit, offset) {
  if(!util.isFunction(callback)) {
    throw new Error('callback must be a function');
  }

  var resource = this.coinjar.personal.api_endpoint + '/v1/bitcoin_addresses.json',
      query = {};

    if(limit) { query.limit = limit; }
    if(offset) { query.offset = offset; }

  request.get(resource)
    .auth(this.coinjar.personal.auth_token)
    .query(query)
    .end(function (response) {
      if(isResponseError(response, callback)) { return; }
      return callback(null, response.body.bitcoin_addresses);
    });
}

/**
 * @name create
 * @description
 * Create a new Bitcoin Address for user account.
 *
 * @params {Function} callback
 * @params {String} label
 */
function create(callback, label) {
  if(!util.isFunction(callback)) {
    throw new Error('callback must be a function');
  }

  var resource = this.coinjar.personal.api_endpoint + '/v1/bitcoin_addresses.json',
      query = {};

  if(label) { query.label = label; }

  request.post(resource)
    .auth(this.coinjar.personal.auth_token)
    .send(query)
    .end(function (response) {
      if(isResponseError(response, callback)) { return; }
      return callback(null, response.body.bitcoin_address);
    });
}

/**
 * @name BitcoinAddresses
 * @description constructor
 *
 * @returns function that can make the API calls.
 */
function BitcoinAddresses (coinjar) {
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

  result.create = function(callback, label) {
    create.call(self, callback, label);
  };

  return result;
}

/**
 * Module exports
 */
module.exports = BitcoinAddresses;