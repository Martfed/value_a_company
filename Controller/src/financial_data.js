const axios = require('axios');
const { API_KEY } = process.env;

const { currentRatio } = require('./processors/current_ratio')
const { debtToEquity } = require('./processors/debt_to_equity')
const { shareHoldersEquity } = require('./processors/share_holders_equity')
const { netIncome } = require('./processors/net_income')

const getBalanceSheet = async (event) => {
  const response = await axios.get(`https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${event.company}&apikey=${API_KEY}`)

  return {
    body: { 
      debtToEquity: debtToEquity(response.data),
      currentRatio: currentRatio(response.data),
      shareHoldersEquity: shareHoldersEquity(response.data)
    }
  }
}

const getCashFlow = async (event) => {
  try {
    const response = await axios.get(`https://www.alphavantage.co/query?function=CASH_FLOW&symbol=${event.company}&apikey=${API_KEY}`)
    return {
      body: {
        netIncome: netIncome(response.data)
      }
    }
  } catch (error) {
    console.log(error);
  }
}
  
module.exports = { getBalanceSheet, getCashFlow };
  