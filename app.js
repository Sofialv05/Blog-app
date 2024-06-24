const express = require("express");
const app = express();
const port = 3000;
const router = require("./routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

//!-- no 10-12 day 1 belum

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
