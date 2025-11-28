const express = require("express");
const rateLimit = require("express-rate-limit");

const npaReport = require("./reports");

const app = express();
const port = process.env.PORT || 4000;

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ERROR: "Too many request, please try again later" }
});

app.use(limiter);
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

app.listen(port, () => console.log(`API running on port ${port}`));

