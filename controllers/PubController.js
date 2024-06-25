const { Post } = require("../models");

module.exports = class PubController {
  static async getAllPosts(req, res) {
    try {
      const posts = await Post.findAll();
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getPostById(req, res) {
    const { postId } = req.params;
    try {
      const post = await Post.findByPk(postId);

      if (!post) {
        res.status(404).json({ message: `Post with id: ${postId} not found` });
        return;
      }
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
