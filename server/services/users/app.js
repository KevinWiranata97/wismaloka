if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
const express = require("express");
const app = express();
const cors = require("cors");
const index = require("./routes/index");
const errHandle = require("./middlewares/errHandler");


app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use("/", index);

app.use(errHandle);



module.exports = app