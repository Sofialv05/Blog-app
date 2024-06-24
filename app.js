const express = require("express");
const PostController = require("./controllers/PostController");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", PostController.findAllPosts);

app.post("/test");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
