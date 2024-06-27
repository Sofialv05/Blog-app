const app = require("../app");
const request = require("supertest");
const { sequelize, Post } = require("../models");
const { queryInterface } = sequelize;
let posts = require("../data/posts.json");
let categories = require("../data/categories.json");
let users = require("../data/staff.json");

beforeAll(async () => {
  posts = posts.map((e) => {
    e.createdAt = e.updatedAt = new Date();
    return e;
  });
  //   console.log(posts);
  await queryInterface.bulkInsert("Posts", posts, {});
});

afterAll(async () => {
  await queryInterface.bulkDelete("Posts", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});

describe("GET pub/posts", () => {
  describe("Success", () => {
    test("success showing all posts for public", async () => {
      const { status, body } = await request(app).get("/pub/posts");

      console.log(body);
      expect(status).toBe(200);
      expect(body).toBeInstanceOf(Array);
      expect(body[0]).toHaveProperty("id", expect.any(Number));
      expect(body[0]).toHaveProperty("title", expect.any(String));
      expect(body[0]).toHaveProperty("content", expect.any(String));
      expect(body[0]).toHaveProperty("imgUrl");
      expect(body[0]).toHaveProperty("CategoryId", expect.any(Number));
      expect(body[0]).toHaveProperty("AuthorId", expect.any(Number));
    });
  });
});

describe("GET pub/posts/:postId", () => {
  describe("Success", () => {
    test("success showing a post with post's id for public", async () => {
      const { status, body } = await request(app).get("/pub/posts/1");

      console.log(body);
      expect(status).toBe(200);
      expect(body).toBeInstanceOf(Object);
      expect(body).toHaveProperty("id", expect.any(Number));
      expect(body).toHaveProperty("title", expect.any(String));
      expect(body).toHaveProperty("content", expect.any(String));
      expect(body).toHaveProperty("imgUrl");
      expect(body).toHaveProperty("CategoryId", expect.any(Number));
      expect(body).toHaveProperty("AuthorId", expect.any(Number));
    });
  });

  describe("Failed", () => {
    describe("Post Not Found", () => {
      test("Failed getting a post when the post's id is unavailable for public", async () => {
        const { status, body } = await request(app).get("/pub/posts/30");

        console.log(body);
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Post not found");
      });
    });
  });
});
