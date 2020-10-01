const express = require("express");
const connectDB = require("./config/db");
const ConnectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json({ extended: false }));

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
