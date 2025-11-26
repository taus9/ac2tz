const express = require("express");
const app = express();

app.use(express.json());

app.post("/code", (req, res) => {
  const { areaCode } = req.body;

  // Validate input
  if (typeof areaCode !== "number") {
    return res.status(400).json({ error: "areaCode must be a number." });
  }

  if (areaCode < 200 || areaCode > 999) {
    return res
      .status(400)
      .json({ error: "areaCode must be between 200 and 999." });
  }

  // Lookup timezone
  const timeZone = areaCodeToTimezone[areaCode];

  if (!timeZone) {
    return res.status(404).json({ error: "Not in use." });
  }

  return res.json({ timeZone });
});

app.listen(3000, () => console.log("API running on port 3000"));

