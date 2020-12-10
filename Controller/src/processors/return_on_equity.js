/* eslint no-param-reassign: ["error", { "props": false }] */

const returnOnEquity = (cashflow, shareHoldersEquity) => {
  const roe = cashflow.netIncome.map((report, index) => {
    report.totalShareholderEquity = shareHoldersEquity[index].shareHoldersEquity;
    return report;
  });

  return roe.map((report) => ({
    returnOnEquity: Math.round((report.totalShareholderEquity / report.netIncome) * 100) / 100,
    year: report.year,
  }));
};

module.exports = { returnOnEquity };
