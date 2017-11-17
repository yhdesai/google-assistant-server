// Copyright 2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

process.env.DEBUG = 'actions-on-google:*';

// We need the Assistant client for all the magic here
const Assistant = require('actions-on-google').ApiAiAssistant;
// To make our http request (a bit nicer)
const request = require('request');

// the actions we are supporting (get them from api.ai)
const ACTION_PRICE = 'price';
const ACTION_TOTAL = 'total';
const ACTION_BLOCK = 'block';
const ACTION_MARKET = 'marketcap';
const ACTION_INTERVAL = 'interval';

// The end-points to our calls
const EXT_BITCOIN_API_URL = "https://blockchain.info";
const EXT_PRICE = "/q/24hrprice";
const EXT_TOTAL = "/q/totalbc";
const EXT_BLOCK_COUNT = "/q/getblockcount";
const EXT_MARKET_CAP = "/q/marketcap";
const EXT_INTERVAL = "/q/interval";

// [START Bitcoin Info]
exports.bitcoinInfo = (req, res) => {
  const assistant = new Assistant({request: req, response: res});
  console.log('bitcoinInfoAction Request headers: ' + JSON.stringify(req.headers));
  console.log('bitcoinInfoAction Request body: ' + JSON.stringify(req.body));

  // Fulfill price action business logic
  function priceHandler (assistant) {
      const msg = "Right now the price of a bitcoihn is USD. What else  would you like to know?";
      assistant.ask(msg);
  }

  // Fulfill total bitcoin action
  function totalHandler (assistant) {
      const msg = "Right now there are billion bitcoins around the world. What else would you like to know?";
      assistant.ask(msg);
   
  }

  // Fulfill block count action
  function blockCountHandler (assistant) {
      const msg = "Right now there are blocks. What else would you like to know? the price?";
      assistant.ask(msg);
  
  }

  // Fulfill market cap action
  function marketCaptHandler (assistant) {
      const msg = "Right now market cap is billions. What else would you like to know?";
      assistant.ask(msg);
  
  }

  // Fulfill interval action
  function intervalHandler (assistant) {
    const msg = "Right now the interval between blocks is seconds. What else would you like to know?";
      assistant.ask(msg);
  
  }

  // The Entry point to all our actions
  const actionMap = new Map();
  actionMap.set(ACTION_PRICE, priceHandler);
  actionMap.set(ACTION_TOTAL, totalHandler);
  actionMap.set(ACTION_BLOCK, blockCountHandler);
  actionMap.set(ACTION_MARKET, marketCaptHandler);
  actionMap.set(ACTION_INTERVAL, intervalHandler);

  assistant.handleRequest(actionMap);
};
// [END Bitcoin Info]
