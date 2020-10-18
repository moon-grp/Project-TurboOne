const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortId = require("shortid");
const config = require("config");
const bodyParser = require("body-parser");
const cors = require("cors")


const jasonParser= bodyParser.json();

const Url = require("../models/url");

router.post("/shorten", jasonParser, cors(), async (req, res) => {
  req.header("Access-Control-Allow-Origin", '*');
  req.header("Access-Control-Allow-Credentials", true);
  req.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  req.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  
  const {longUrl}= req.body;
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
       
        url = new Url({
          longUrl,
          urlCode,
          shortUrl,
          date: new Date(),
        });

        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("Server Error!");
    }
  } else {
    res.status(401).json("Invalid long url");
  
  }
});

module.exports = router;
