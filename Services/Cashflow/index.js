const axios = require('axios');
const { API_KEY } = process.env;

const { netIncome } = require('./src/net_income')

exports.handler = async (event) => {
  try {
    const response = await axios.get(`https://www.alphavantage.co/query?function=CASH_FLOW&symbol=${event.company}&apikey=${API_KEY}`)
    return {
      statusCode: 200,
      body: {
        netIncome: netIncome(response.data)
      }
    }
  } catch (error) {
    console.log(error);
  }
};
