const fs = require("fs");
const excelToJson = require("convert-excel-to-json");
const _ = require("lodash");

(async () => {
  const result = excelToJson({
    sourceFile: "MCAP31122020.xlsx",
    header: {
      rows: 1,
    },
  });

  const companies = {};

  result["MCAP 31122020"].forEach((company) => {
    if (company.B === undefined) return;
    companies[company.B] = company.C;
  });

  const sorted = _(companies).toPairs().orderBy(0).fromPairs().value();

  const directory = JSON.stringify(sorted);

  await fs.writeFileSync("./companies.json", directory);
})();
