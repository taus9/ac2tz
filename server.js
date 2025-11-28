const express = require("express");
const npaReport = require("./reports");

const app = express();

app.use(express.json());

app.get("/codes/:areaCodes", (req, res) => {
  const codes = req.params.areaCodes.split(",");
  
  const reports = {};
  
  for (const code of codes) {
  
    // Validate input
    if (isNaN(code) || code < 200 || code > 999) {
      reports[code] = { ERROR: "Invalid area code" };
      continue;
    }
    
    const report = npaReport[code];

    if (!report) {
      reports[code] = { ERROR: "Not in use" };
      continue;
    }
    
    reports[code] = report;
  }

    return res.json(reports);
});

app.listen(3000, () => console.log("API running on port 3000"));

