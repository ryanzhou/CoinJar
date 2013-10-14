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
    callback(new Error('Coinjar personal fair_rate api returned error: ' + response.error));
    return true;
  }
  if(!response.body) {
    callback(new Error('Coinjar personal fair_rate api returned error: No response body.'));
    return true;
  }
  return false;
}

/**
 * @name get
 * @description
 * Fair Rate for currency.
 *
 * @params {String} currency
 * @params {Function} callback
 */
function get(currency, callback) {
  if(['BTC', 'USD', 'AUD', 'NZD', 'CAD', 'EUR', 'GBP', 'SGD', 'HKD', 'CHF', 'JPY'].indexOf(currency) === -1) {
    throw new Error('specified currency is not supported');
  }

  if(!util.isFunction(callback)) {
    throw new Error('callback must be a function');
  }

  var resource = this.coinjar.personal.api_endpoint +
    '/v1/fair_rate/' +
    currency +
    '.json';

  request.get(resource)
    .auth(this.coinjar.personal.auth_token)
    .end(function (response) {
      if(isResponseError(response, callback)) { return; }
      return callback(null, response.body);
    });
}

/**
 * @name FairRate
 * @description constructor
 *
 * @returns function that can make the API call.
 */
function FairRate (coinjar) {
  var self = this;
  self.coinjar = coinjar;

  var result = function(currency, callback) {
    get.call(self, currency, callback);
  };

  return result;
}

/**
 * Module exports
 */
module.exports = FairRate;