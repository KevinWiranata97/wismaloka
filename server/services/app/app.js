if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use(errorHandler);

app.listen(process.env.PORT || 3002, () => {
  console.log(`Example app listening on port ${port} http://localhost:3002/`);
});

module.exports = app;
