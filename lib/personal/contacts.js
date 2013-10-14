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
    callback(new Error('Coinjar personal contacts api returned error: ' + response.error));
    return true;
  }
  if(!response.body || !(response.body.contacts || response.body.contact)) {
    callback(new Error('Coinjar personal contacts api returned error: No response body.'));
    return true;
  }
  return false;
}

/**
 * @name get
 * @description
 * Specified Contact for user account.
 *
 * @params {String} uuid
 * @params {Function} callback
 */
function get(uuid, callback) {
  if(!util.isFunction(callback)) {
    throw new Error('callback must be a function');
  }

  var resource = this.coinjar.personal.api_endpoint +
    '/v1/contacts/' +
    uuid +
    '.json';

  request.get(resource)
    .auth(this.coinjar.personal.auth_token)
    .end(function (response) {
      if(isResponseError(response, callback)) { return; }
      return callback(null, response.body.contact);
    });
}

/**
 * @name list
 * @description
 * All Contacts for user account.
 *
 * @params {Function} callback
 * @params {String} limit
 * @params {String} offset
 */
function list(callback, limit, offset) {
  if(!util.isFunction(callback)) {
    throw new Error('callback must be a function');
  }

  var resource = this.coinjar.personal.api_endpoint + '/v1/contacts.json',
    query = {};

  if(limit) { query.limit = limit; }
  if(offset) { query.offset = offset; }

  request.get(resource)
    .auth(this.coinjar.personal.auth_token)
    .query(query)
    .end(function (response) {
      if(isResponseError(response, callback)) { return; }
      return callback(null, response.body.contacts);
    });
}

/**
 * @name create
 * @description
 * Create a new Contact for user account.
 *
 * @params {Function} callback
 * @params {String} payee
 * @params {String} name
 */
function create(callback, payee, name) {
  if(!util.isFunction(callback)) {
    throw new Error('callback must be a function');
  }

  var resource = this.coinjar.personal.api_endpoint + '/v1/contacts.json',
    query = {
      contact : {}
    };

  if(payee) { query.contact.payee = payee; }
  if(name) { query.contact.name = name; }

  request.post(resource)
    .auth(this.coinjar.personal.auth_token)
    .send(query)
    .end(function (response) {
      if(isResponseError(response, callback)) { return; }
      return callback(null, response.body.contact);
    });
}

/**
 * @name del
 * @description
 * Remove an existing contact.
 *
 * @params {String} uuid
 * @params {Function} callback
 */
function del(uuid, callback) {
  if(!util.isFunction(callback)) {
    throw new Error('callback must be a function');
  }

  var resource = this.coinjar.personal.api_endpoint +
    '/v1/contacts/' +
    uuid +
    '.json';

  request.del(resource)
    .auth(this.coinjar.personal.auth_token)
    .end(function (response) {
      if(response.error) {
        return callback(new Error('Coinjar personal contacts api returned error: ' + response.error));
      }
      return callback(null, response.statusCode);
    });
}

/**
 * @name Contacts
 * @description constructor
 *
 * @returns function that can make the API calls.
 */
function Contacts (coinjar) {
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

  result.create = function(callback, payee, name) {
    create.call(self, callback, payee, name);
  };

  result.delete = function(uuid, callback) {
    del.call(self, uuid, callback);
  };

  return result;
}

/**
 * Module exports
 */
module.exports = Contacts;