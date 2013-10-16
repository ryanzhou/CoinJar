# CoinJar NPM 

 [![Build Status](https://secure.travis-ci.org/jimlyndon/CoinJar.png?branch=master)](http://travis-ci.org/jimlyndon/CoinJar)
 [![Dependency Status](https://gemnasium.com/jimlyndon/CoinJar.png)](https://gemnasium.com/jimlyndon/CoinJar)
 [![NPM version](https://badge.fury.io/js/coinjar.png)](http://badge.fury.io/js/coinjar)

Coinjar API (business and personal) client for Node.js

## Getting Started
Install the module with: `npm install coinjar`

Or add the module to your package file, replacing the version number with the latest version:

    "dependencies": {
      "coinjar": ">= 0.0.1"
    }

## Documentation
To use, in your code, require the library and initialize it's export:

      var coinjar = require('coinjar'),
      cj = new coinjar({
        auth_token: 'YOUR_USER_TOKEN',
        merchant_uuid: YOUR_MERCHANT_UUID, 
        merchant_secret: YOUR_MERCHANT_SECRET,
        sandbox: true
      })

## API tokens/keys
Make sure you get an API key from CoinJar.io.  First create an account - best to use the sandbox environment where
you can send and receive fake bitcoins when starting out.  To do this 
[sign up](https://secure.sandbox.coinjar.io/users/sign_in) for a Coinjar Sandbox account.

In your CoinJar sandbox account you can create a "bitcoin address" and send test bitcoin to this address 
from a [Faucet](http://testnet.mojocoin.com/).  You can return to them some test bitcoin as well.  You can create
addresses under your account and send/receive bitcoin, this way you have some test transactional data to work with.

Finally you need to turn on your user API access by going to account settings -> API access -> Enable API.
This will ask you for your credentials and display an API key.

If you're building a merchant application you will also need to 
[retrieve your merchant id and key](https://checkout.sandbox.coinjar.io/merchant/credentials) from your Sandbox account
or from the [live/production Coinjar website](https://checkout.coinjar.io/merchant/credentials)

The CoinJar NPM library also lets you use the following environment variables in lieu of declaring them in the index.js file:

    $ export COINJAR_AUTH_TOKEN="YOUR_USER_TOKEN"
    $ export COINJAR_MERCH_UUID="YOUR_MERCHANT_UUID"
    $ export COINJAR_MERCH_SECRET="YOUR_MERCHANT_SECRET"
    
And your declaration in code:

      var coinjar = require('coinjar'),
      cj = new coinjar({
        sandbox: true
      })


## Examples
In typical Node.js fashion, all the API's take callback that take (error, response) parameters, such as:

    cj.personal.transactions(function (error, response) {
      // do something with the response
    });

The easiest way to get started is to take a look at the 
[integration test suite](https://github.com/jimlyndon/CoinJar/tree/master/test) included in this NPM library.

Quick Start - You can also [download a test Node.js application](https://github.com/jimlyndon/CoinJarExampleNodeJS)
that is already using this CoinJar NPM library, to get you started quickly.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. 
Add unit tests to the existing integration test suite, for any new/changes to the code.
Also lint and test your code using [Grunt](http://gruntjs.com/).

For debugging, you should install node inspector. Open a new terminal window/tab and run:

    $ npm install -g node-inspector

Next, run node-inspector:

    $ node-inspector &
    
You should get the output:

    Visit http://127.0.0.1:8080/debug?port=5858 to start debugging.

Open another terminal into the working directory and execute Node with the debug flag

    $ node --debug-brk `which nodeunit` test/** 

You should get the output:

    debugger listening on port 5858

You can open Chrome browser at `http://127.0.0.1:8080/debug?port=5858` to use it's development 
tools to debug your application.


## Release History
0.0.0 Intial commit, white walls

0.0.1 Documentation

## License
Copyright (c) 2013 Jim Lyndon. Licensed under the MIT license.
