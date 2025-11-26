const fs = require("fs");
const path = require("path");

const csvFilename = "trimmed_npa_report.csv";


function loadNPAReport() {
  const filePath = path.join(__dirname, csvFilename);
  const csv = fs.readFileSync(filePath, "utf8");

  const lines = csv.trim().split("\n");  

  const report = {};
  
  // i starts at 1 to skip the header.
  for (let i = 1; i < lines.length; i++) {
    const [NPA_ID_STR, LOCATION, COUNTRY, TIME_ZONE_RAW] = lines[i].split(",");
    const NPA_ID = Number(NPA_ID_STR);
    const TIME_ZONE = TIME_ZONE_RAW.trim();
    report[NPA_ID] = {LOCATION, COUNTRY, TIME_ZONE};
  }
  
  return report;
}

module.exports = loadNPAReport();
