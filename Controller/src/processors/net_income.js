const netIncome = (body) => body.annualReports.map((ar) => ({
  netIncome: ar.netIncome,
  year: Number.parseInt(ar.fiscalDateEnding.split('-')[0], 10),
}));

module.exports = { netIncome };
