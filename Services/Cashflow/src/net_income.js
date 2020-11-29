const netIncome = (body) => {
  return body.annualReports.map(ar => {
    return {
      netIncome: ar.netIncome,
      year: Number.parseInt(ar.fiscalDateEnding.split('-')[0])
    }
  })
}

module.exports = { netIncome };
