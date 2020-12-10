const { returnOnEquity } = require('./src/processors/return_on_equity');
const {
  getBalanceSheet,
  getCashFlow,
  getEarnings,
  getCompanyData,
} = require('./src/financial_data');

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

exports.handler = async (event) => {
  let balanceSheet = {};
  let cashFlow = {};
  let earnings = {};
  let companyData = {};
  try {
    balanceSheet = await getBalanceSheet(event.queryStringParameters);
    cashFlow = await getCashFlow(event.queryStringParameters);
    earnings = await getEarnings(event.queryStringParameters);
    companyData = await getCompanyData(event.queryStringParameters);
  } catch (error) {
    console.log(error);
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      debtToEquity: balanceSheet.debtToEquity,
      currentRatio: balanceSheet.currentRatio,
      returnOnEquity: returnOnEquity(cashFlow, balanceSheet.shareHoldersEquity),
      earningsPerShare: earnings,
      companyData,
    }),
  };
};
