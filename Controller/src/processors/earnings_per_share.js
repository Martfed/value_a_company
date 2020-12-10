const earningsPerShare = (body) => body.annualEarnings.map((report) => ({
  earningsPerShare: report.reportedEPS,
  year: Number.parseInt(report.fiscalDateEnding.split('-')[0], 10),
}));

module.exports = { earningsPerShare };
