const shareHoldersEquity = (body) => {
  return body.annualReports.map(report => {

    return {
      shareHoldersEquity: Number.parseInt(report.totalShareholderEquity),
      year: Number.parseInt(report.fiscalDateEnding.split('-')[0])
    }
  })
}

module.exports = { shareHoldersEquity };
