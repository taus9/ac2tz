const express = require("express");
const npaReport = require("./reports");

const app = express();

app.use(express.json());

app.get("/code/:areaCode", (req, res) => {
  const areaCode = Number(req.params.areaCode);

  // Validate input
  if (isNaN(areaCode)) {
    return res.status(400).json({ error: "areaCode must be a number." });
  }

  if (areaCode < 200 || areaCode > 999) {
    return res
      .status(400)
      .json({ error: "areaCode must be between 200 and 999." });
  }

  // Lookup timezone
  const report = npaReport[areaCode];

  if (!report) {
    return res.status(404).json({ error: "Not in use." });
  }

  return res.json(report);
});

app.listen(3000, () => console.log("API running on port 3000"));

