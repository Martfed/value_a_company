const shareHoldersEquity = (body) => body.annualReports.map((report) => ({
  shareHoldersEquity: Number.parseInt(report.totalShareholderEquity, 10),
  year: Number.parseInt(report.fiscalDateEnding.split('-')[0], 10),
}));

module.exports = { shareHoldersEquity };
