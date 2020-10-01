const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortId = require("shortid");
const config = require("config");

const Url = require("../models/url");

router.post("shorten", async (res, req) => {
  const { longUrl } = req.body;
  const baseUrl = config.get("baseUrl");

  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base Url");
  }

  //generate code
  const urlCode = shortId.generate();

  //check long url code
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });
      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + "/" + urlCode;
      }
    } catch (err) {}
  }
});

module.exports = router;
