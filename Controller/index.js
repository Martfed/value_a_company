const { returnOnEquity } = require('./src/return_on_equity')
const { invokeBalanceSheet, invokeCashFlow } = require('./src/lambda_invocations')
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
};

exports.handler = async (event, context) => {
  const balanceSheet = await invokeBalanceSheet(event)
  const cashFlow = await invokeCashFlow(event)

  const parsedBalanceSheet = JSON.parse(balanceSheet.Payload).body
  const parsedCashFlow = JSON.parse(cashFlow.Payload).body
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      debtToEquity: parsedBalanceSheet.debtToEquity,
      currentRatio: parsedBalanceSheet.currentRatio,
      returnOnEquity: returnOnEquity(parsedCashFlow, parsedBalanceSheet.shareHoldersEquity)
    })
  }
}
