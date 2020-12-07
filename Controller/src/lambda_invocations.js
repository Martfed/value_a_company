const AWS = require('aws-sdk')
const lambda = new AWS.Lambda({ region: 'eu-west-3' })

const invokeBalanceSheet = async (event) => {
	const balanceSheetParams = { 
    FunctionName: 'balance-sheet',
    Payload: JSON.stringify(event.queryStringParameters)
	}
	
	const balanceSheet = await new Promise((resolve, reject) => {
    lambda.invoke(balanceSheetParams, (error, data) => { resolve(data) })
	})
	
	return balanceSheet
}

const invokeCashFlow = async (event) => {
  const cashFlowParams = {
    FunctionName: 'cash-flow',
    Payload: JSON.stringify(event.queryStringParameters)
	}
	
	const cashFlow = await new Promise((resolve, reject) => {
    lambda.invoke(cashFlowParams, (error, data) => { resolve(data) })
	})
	
	return cashFlow
}
  
module.exports = { invokeBalanceSheet, invokeCashFlow };
  