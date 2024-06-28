const { Post } = require("../models");

const authorizeAdmin = async (req, res, next) => {
  try {
    let { role } = req.user;

    if (role !== "Admin") {
      throw { name: "Forbidden" };
    }
    next();
  } catch (err) {
    next(err);
  }
};

const authorization = async (req, res, next) => {
  try {
    const { postId } = req.params;
    let { id, role } = req.user;

    if (role === "Admin") {
      next();
      return;
    }

    const post = await Post.findByPk(postId);

    if (!post) {
      throw {
        name: "NotFound",
        message: "Post not found",
      };
    }

    if (post.AuthorId !== id) throw { name: "Forbidden" };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { authorization, authorizeAdmin };
