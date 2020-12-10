const currentRatio = (body) => body.annualReports.map((report) => {
  const { totalCurrentAssets } = report;
  const { totalCurrentLiabilities } = report;
  const difference = totalCurrentAssets / totalCurrentLiabilities;

  return {
    currentRatio: Math.round(difference * 100) / 100,
    year: Number.parseInt(report.fiscalDateEnding.split('-')[0], 10),
  };
});

module.exports = { currentRatio };
