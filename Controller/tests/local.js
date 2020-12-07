/* eslint-disable no-console */
require('dotenv').config({ silent: true });
const nock = require('nock');
const balanceSheet = require('./balance_sheet.json')
const cashFlow = require('./cash_flow.json')

process.env.API_KEY = 'test';

nock('https://www.alphavantage.co')
  .get('/query?function=BALANCE_SHEET&symbol=IBM&apikey=test')
  .reply(200, balanceSheet);

nock('https://www.alphavantage.co')
  .get('/query?function=CASH_FLOW&symbol=IBM&apikey=test')
  .reply(200, cashFlow);

const { handler } = require('../index');

handler({ queryStringParameters: { company: "IBM" } })
  .then(res => console.log(JSON.stringify(res)));
