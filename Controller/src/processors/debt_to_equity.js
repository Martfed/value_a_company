const debtToEquity = (body) => body.annualReports.map((report) => {
  const asset = report.totalAssets;
  const liability = report.totalLiabilities;
  const difference = asset - liability;

  return {
    debtToEquity: Math.round((liability / difference) * 100) / 100,
    year: Number.parseInt(report.fiscalDateEnding.split('-')[0], 10),
  };
});

module.exports = { debtToEquity };
