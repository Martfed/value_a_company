const returnOnEquity = (cashflow, shareHoldersEquity) => {
  const roe = cashflow.body.netIncome.map((report, index) => {
    report.totalShareholderEquity = shareHoldersEquity[index].shareHoldersEquity
    return report
  })

  return roe.map(report => {
    return {
      returnOnEquity: Math.round(report.totalShareholderEquity/report.netIncome *  100) / 100,
      year: report.year
    }
  })
}

module.exports = { returnOnEquity };
