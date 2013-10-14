/*
 * Coinjar API npm
 * https://coinjar.io
 *
 * Copyright (c) 2013 Jim Lyndon
 * Licensed under the MIT license.
 */

'use strict';

/**
 * Module dependencies.
 */
var PersonalLiveApiEndpoint = 'https://api.coinjar.io',
  PersonalSandboxApiEndpoint = 'https://secure.sandbox.coinjar.io/api',

  MerchantLiveApiEndpoint = 'https://checkout.coinjar.io',
  MerchantSandboxApiEndpoint = 'https://checkout.sandbox.coinjar.io/api',

  MerchantLiveOrdersEndpoint = 'https://checkout.coinjar.io/orders',
  MerchantSandboxOrdersEndpoint = 'https://checkout.sandbox.coinjar.io/orders',

  FairRate = require('./personal/fair_rate'),
  Account = require('./personal/account'),
  BitcoinAddresses = require('./personal/bitcoin_addresses'),
  Contacts = require('./personal/contacts'),
  Payments = require('./personal/payments'),
  Transactions = require('./personal/transactions'),
  Orders = require('./merchant/orders');


/**
 * Coinjar personal and merchant client.
 */
module.exports = function Coinjar(options) {
  this.personal = {
    auth_token : options.auth_token || process.env.COINJAR_AUTH_TOKEN,
    api_endpoint : options.sandbox ? PersonalSandboxApiEndpoint : PersonalLiveApiEndpoint,
    account : new Account(this),
    bitcoin_addresses : new BitcoinAddresses(this),
    contacts : new Contacts(this),
    payments : new Payments(this),
    transactions : new Transactions(this),
    fair_rate : new FairRate(this)
  };
  this.merchant = {
    uuid : options.merchant_uuid || process.env.COINJAR_MERCH_UUID,
    secret : options.merchant_secret || process.env.COINJAR_MERCH_SECRET,
    api_endpoint : options.sandbox ? MerchantSandboxApiEndpoint : MerchantLiveApiEndpoint,
    orders_endpoint: options.sandbox ? MerchantSandboxOrdersEndpoint : MerchantLiveOrdersEndpoint,
    orders : new Orders(this)
  };
};