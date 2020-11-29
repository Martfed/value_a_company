const axios = require('axios');
const { API_KEY } = process.env;
const { currentRatio } = require('./src/current_ratio')
const { debtToEquity } = require('./src/debt_to_equity')
const { shareHoldersEquity } = require('./src/share_holders_equity')

exports.handler = async (event, context) => {
  try {
    const response = await axios.get(`https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${event.company}&apikey=${API_KEY}`)
    return {
      statusCode: 200,
      body: { 
        debtToEquity: debtToEquity(response.data),
        currentRatio: currentRatio(response.data),
        shareHoldersEquity: shareHoldersEquity(response.data)
      }
    }
  } catch (error) {
    console.log(error);
  }
}
