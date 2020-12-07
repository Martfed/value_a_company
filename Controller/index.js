const { returnOnEquity } = require('./src/processors/return_on_equity')
const { getBalanceSheet, getCashFlow } = require('./src/financial_data')
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
};

exports.handler = async (event, context) => {
  let balanceSheet = {}
  let cashFlow = {}
  try {
    balanceSheet = await getBalanceSheet(event.queryStringParameters)
    cashFlow = await getCashFlow(event.queryStringParameters)
  } catch (error) {
    console.log(error);
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      debtToEquity: balanceSheet.body.debtToEquity,
      currentRatio: balanceSheet.body.currentRatio,
      returnOnEquity: returnOnEquity(cashFlow.body, balanceSheet.body.shareHoldersEquity)
    })
  }
}
