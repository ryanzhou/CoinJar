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
    callback(new Error('Coinjar personal account api returned error: ' + response.error));
    return true;
  }
  if(!response.body || !response.body.user) {
    callback(new Error('Coinjar personal account api returned error: No response body.'));
    return true;
  }
  return false;
}

/**
 * @name get
 * @description
 * Information for user account.
 *
 * @params {Function} callback
 * @api public
 */
function get(callback) {
  if(!util.isFunction(callback)) {
    throw new Error('callback must be a function');
  }

  var resource = this.coinjar.personal.api_endpoint + '/v1/account.json';

  request.get(resource)
    .auth(this.coinjar.personal.auth_token)
    .end(function (response) {
      if(isResponseError(response, callback)) { return; }
      return callback(null, response.body.user);
    });
}

/**
 * @name Account
 * @description constructor
 *
 * @returns function that cane make the API calls.
 */
function Account (coinjar) {
  var self = this;
  self.coinjar = coinjar;

  return function(callback) {
    get.call(self, callback);
  };
}

/**
 * Module exports
 */
module.exports = Account;