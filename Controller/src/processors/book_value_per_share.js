const bookValuePerShare = (body) => body.annualReports.map((report) => {
  const shareHoldersEquity = Number.parseInt(report.totalShareholderEquity, 10);
  const preferredStock = report.preferredStockTotalEquity === 'None' ? 0 : Number.parseInt(report.preferredStockTotalEquity, 10);
  const outstandingShares = Number.parseInt(report.commonStockSharesOutstanding, 10);
  const bookValue = (shareHoldersEquity - preferredStock) / outstandingShares;

  return {
    bookValuePerShare: Math.round(bookValue * 100) / 100,
    year: Number.parseInt(report.fiscalDateEnding.split('-')[0], 10),
  };
});

module.exports = { bookValuePerShare };
