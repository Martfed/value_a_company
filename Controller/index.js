const AWS = require('aws-sdk')
const lambda = new AWS.Lambda({ region: 'eu-west-3' })

const { returnOnEquity } = require('./src/return_on_equity')
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
};

exports.handler = async (event, context) => {
  const balanceSheetParams = { 
    FunctionName: 'balance-sheet',
    Payload: JSON.stringify(event.queryStringParameters)
  }
  const cashFlowParams = {
    FunctionName: 'cash-flow',
    Payload: JSON.stringify(event.queryStringParameters)
  }
  const cashFlow = await new Promise((resolve, reject) => {
    lambda.invoke(cashFlowParams, (error, data) => { resolve(data) })
  })
  const balanceSheet = await new Promise((resolve, reject) => {
    lambda.invoke(balanceSheetParams, (error, data) => { resolve(data) })
  })

  const parsedBalanceSheet = JSON.parse(balanceSheet.Payload).body
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      debtToEquity: parsedBalanceSheet.debtToEquity,
      currentRatio: parsedBalanceSheet.currentRatio,
      returnOnEquity: returnOnEquity(cashFlow, parsedBalanceSheet.shareHoldersEquity)
    })
  }
}
