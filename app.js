const express = require("express");
const PostController = require("./controllers/PostController");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.redirect("/Posts");
});

app.get("/Posts", PostController.findAllPosts);

app.post("/Posts", PostController.createPost);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
