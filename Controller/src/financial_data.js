const axios = require('axios');

const { API_KEY } = process.env;

const { currentRatio } = require('./processors/current_ratio');
const { debtToEquity } = require('./processors/debt_to_equity');
const { shareHoldersEquity } = require('./processors/share_holders_equity');
const { earningsPerShare } = require('./processors/earnings_per_share');
const { netIncome } = require('./processors/net_income');

const getBalanceSheet = async (event) => {
  const response = await axios.get(`https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${event.company}&apikey=${API_KEY}`);

  return {
    debtToEquity: debtToEquity(response.data),
    currentRatio: currentRatio(response.data),
    shareHoldersEquity: shareHoldersEquity(response.data),
  };
};

const getCashFlow = async (event) => {
  const response = await axios.get(`https://www.alphavantage.co/query?function=CASH_FLOW&symbol=${event.company}&apikey=${API_KEY}`);
  return {
    netIncome: netIncome(response.data),
  };
};

const getEarnings = async (event) => {
  const response = await axios.get(`https://www.alphavantage.co/query?function=EARNINGS&symbol=${event.company}&apikey=${API_KEY}`);
  return {
    earningsPerShare: earningsPerShare(response.data),
  };
};

const getCompanyData = async (event) => {
  const {
    data: {
      Exchange, Sector, PERatio, DividendPerShare, DividendYield,
    },
  } = await axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${event.company}&apikey=${API_KEY}`);
  return {
    Exchange,
    Sector,
    PERatio,
    DividendPerShare,
    DividendYield,
  };
};

module.exports = {
  getBalanceSheet,
  getCashFlow,
  getEarnings,
  getCompanyData,
};
