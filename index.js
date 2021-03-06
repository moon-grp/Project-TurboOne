const express = require("express");
const connectDB = require("./config/db");
const ConnectDB = require("./config/db");
const validUrl = require("valid-url");
const shortId = require("shortid");
const config = require("config");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

connectDB();

app.use(express.json());

const jasonParser = bodyParser.json();

const Url = require("./models/url");

//app.use(bodyParser.json()); // for parsing application/json
//app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

/*app.use((req, res, next) => {
 res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
}); */

app.use("/", require("./routes/index"));
app.use("/api/url", jasonParser, cors(), require("./routes/url"));
/*app.post("/api/url/shorten", async (req, res) => {
  const longUrl = req.body;
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
}); */

//const PORT = 5000;
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
