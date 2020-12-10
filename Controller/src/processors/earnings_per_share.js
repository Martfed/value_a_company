const earningsPerShare = (body) => {
  return body.annualEarnings.map(report => {
    return {
      earningsPerShare: report.reportedEPS,
      year: Number.parseInt(report.fiscalDateEnding.split('-')[0])
    }
  })
}

module.exports = { earningsPerShare };
