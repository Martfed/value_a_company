const currentRatio = (body) => {
  return body.annualReports.map(report => {
    const totalCurrentAssets = report.totalCurrentAssets
    const totalCurrentLiabilities = report.totalCurrentLiabilities
    const difference = totalCurrentAssets / totalCurrentLiabilities

    return {
      currentRatio: Math.round(difference * 100) / 100,
      year: Number.parseInt(report.fiscalDateEnding.split('-')[0])
    }
  })
}

module.exports = { currentRatio };
