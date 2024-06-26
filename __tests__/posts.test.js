const app = require("../app");
const request = require("supertest");
const { sequelize, User, Post } = require("../models");
const { signToken } = require("../helpers/jwt");
const { queryInterface } = sequelize;
const categories = require("../data/categories.json");
const posts = require("../data/posts.json");
const staff = require("../data/staff.json");
const { encrypt } = require("../helpers/bycript");

const admin_test = {
  email: "admin1@gmail.com",
  password: "123456",
  role: "Admin",
};

const user_test_1 = {
  email: "test1@gmail.com",
  password: "123456",
};

const user_test_2 = {
  email: "test2@gmail.com",
  password: "123456",
};

const new_post = {
  title: "test title",
  content: "test content",
  imgUrl: "test img",
  CategoryId: 1,
};

const new_post_2 = {
  title: "test title 2",
  content: "test content 2",
  imgUrl: "test img",
  CategoryId: 3,
  AuthorId: 5,
};

let access_token_admin = "";
let access_token_user1 = "";
let access_token_user2 = "";
// let userId_admin;
// let userId_user1;
// let post1;

beforeAll(async () => {
  categories.forEach((e) => {
    e.createdAt = e.updatedAt = new Date();
  });

  //   staff.forEach((e) => {
  //     e.createdAt = e.updatedAt = new Date();
  //     e.password = encrypt(e.password);
  //   });

  //   posts.forEach((e) => {
  //     e.createdAt = e.updatedAt = new Date();
  //   });

  await queryInterface.bulkInsert("Categories", categories, {});
  //   queryInterface.bulkInsert("Users", staff, {});
  //   queryInterface.bulkInsert("Posts", posts, {});

  let user = await User.create(admin_test);
  let user2 = await User.create(user_test_1);
  let user3 = await User.create(user_test_2);
  //   post1 = await Post.create(new_post_2);

  access_token_admin = signToken({
    id: user.id,
    role: user.role,
  });

  access_token_user1 = signToken({
    id: user2.id,
    role: user2.role,
  });

  access_token_user2 = signToken({
    id: user3.id,
    role: user3.role,
  });

  userId_admin = user.id;
  userId_user1 = user2.id;
});

afterAll(async () => {
  await queryInterface.bulkDelete("Categories", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });

  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });

  await queryInterface.bulkDelete("Posts", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});

describe("POST /posts", () => {
  describe("Success", () => {
    test("sucess adding a new post", async () => {
      const { status, body } = await request(app)
        .post("/posts")
        .set("Authorization", "Bearer " + access_token_user1)
        .send(new_post);

      console.log(body);
      expect(status).toBe(201);
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
    describe("Authentication failed", () => {
      test("Failed when user is not logging in when sending a post", async () => {
        const { status, body } = await request(app)
          .post("/posts")
          .send(new_post);

        console.log(body);
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Unauthenticated");
      });

      test("Failed when user's token is invalid", async () => {
        const { status, body } = await request(app)
          .post("/posts")
          .set("Authorization", "Bearer dsafdsafdsrtewefasdf")
          .send(new_post);

        console.log(body);
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Unauthenticated");
      });
    });

    describe("Validation", () => {
      test("failed when post's title is empty", async () => {
        const { status, body } = await request(app)
          .post("/posts")
          .set("Authorization", "Bearer " + access_token_user1)
          .send({
            title: "",
            content: "test content",
            imgUrl: "test img",
            CategoryId: 1,
          });

        console.log(body);
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Title is required");
      });

      test("failed when post's content is empty", async () => {
        const { status, body } = await request(app)
          .post("/posts")
          .set("Authorization", "Bearer " + access_token_user1)
          .send({
            title: "test",
            content: "",
            imgUrl: "test img",
            CategoryId: 1,
          });

        console.log(body);
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Content is required");
      });
      test("failed when post's category is empty", async () => {
        const { status, body } = await request(app)
          .post("/posts")
          .set("Authorization", "Bearer " + access_token_user1)
          .send({
            title: "test",
            content: "test content",
            imgUrl: "test img",
          });

        console.log(body);
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Category is required");
      });
    });
  });
});

describe("GET /posts", () => {
  describe("Success", () => {
    test("success showing all posts", async () => {
      const { status, body } = await request(app)
        .get("/posts")
        .set("Authorization", "Bearer " + access_token_user1);

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

  describe("Failed", () => {
    describe("Authentication failed", () => {
      test("Failed when user is not logging in when reading posts", async () => {
        const { status, body } = await request(app).get("/posts");

        console.log(body);
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Unauthenticated");
      });

      test("Failed when user's token is invalid when reading posts", async () => {
        const { status, body } = await request(app)
          .get("/posts")
          .set("Authorization", "Bearer dsafdsafdsrtewefasdf");

        console.log(body);
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Unauthenticated");
      });
    });
  });
});

describe("GET /posts/:postId", () => {
  describe("Success", () => {
    test("success showing a post with post's id", async () => {
      const { status, body } = await request(app)
        .get("/posts/1")
        .set("Authorization", "Bearer " + access_token_user1);

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
    describe("Authentication Failed", () => {
      test("Failed when user is not logging in when trying to get a post by id", async () => {
        const { status, body } = await request(app).get("/posts/1");

        console.log(body);
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Unauthenticated");
      });

      test("Failed when user's token is invalid when trying to get a post by id", async () => {
        const { status, body } = await request(app)
          .get("/posts/1")
          .set("Authorization", "Bearer dsafdsafdsrtewefasdf");

        console.log(body);
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Unauthenticated");
      });
    });

    describe("Post Not Found", () => {
      test("Failed getting a post when the post's id is unavailable", async () => {
        const { status, body } = await request(app)
          .get("/posts/0")
          .set("Authorization", "Bearer " + access_token_user1);

        console.log(body);
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Post not found");
      });
    });
  });
});

describe("PUT /posts/:postId", () => {
  describe("Success", () => {
    test("success updating a post by post's id", async () => {
      const { status, body } = await request(app)
        .put("/posts/1")
        .set("Authorization", "Bearer " + access_token_user1)
        .send(new_post_2);

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
    describe("Authentication Failed", () => {
      test("Failed when user is not logging in when trying to update a post by id", async () => {
        const { status, body } = await request(app)
          .put("/posts/1")
          .send(new_post_2);

        // console.log(body);
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Unauthenticated");
      });

      test("Failed when user's token is invalid when trying to update a post by id", async () => {
        const { status, body } = await request(app)
          .put("/posts/1")
          .set("Authorization", "Bearer dsafdsafdsrtewefasdf")
          .send(new_post_2);

        // console.log(body);
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Unauthenticated");
      });
    });

    describe("Post Not Found", () => {
      test("Failed getting a post when the post's id is unavailable", async () => {
        const { status, body } = await request(app)
          .put("/posts/0")
          .set("Authorization", "Bearer " + access_token_user1)
          .send(new_post_2);

        // console.log(body);
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Post not found");
      });
    });

    describe("Authorization Failed", () => {
      test("Failed when user's role is not an admin when trying to update a post by id", async () => {
        const { status, body } = await request(app)
          .put("/posts/1")
          .set("Authorization", "Bearer " + access_token_user2)
          .send(new_post_2);

        console.log(body);
        expect(status).toBe(403);
        expect(body).toHaveProperty("message", "Unauthorized");
      });
    });

    describe("Validation", () => {
      test("failed when post's title is empty when updating", async () => {
        const { status, body } = await request(app)
          .put("/posts/1")
          .set("Authorization", "Bearer " + access_token_user1)
          .send({
            title: "",
            content: "test content",
            imgUrl: "test img",
            CategoryId: 1,
          });

        console.log(body);
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Title is required");
      });

      test("failed when post's content is empty when updating", async () => {
        const { status, body } = await request(app)
          .put("/posts/1")
          .set("Authorization", "Bearer " + access_token_user1)
          .send({
            title: "test",
            content: "",
            imgUrl: "test img",
            CategoryId: 1,
          });

        console.log(body);
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Content is required");
      });
      test("failed when post's category is empty when updating", async () => {
        const { status, body } = await request(app)
          .put("/posts/1")
          .set("Authorization", "Bearer " + access_token_user1)
          .send({
            title: "test",
            content: "test content",
            imgUrl: "test img",
            CategoryId: "",
          });

        console.log(body);
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Category is required");
      });
    });
  });
});

// describe("PATCH /posts/:postId", () => {
//   describe("Success", () => {
//     test("success updating post's image by post's id", async () => {
//       const { status, body } = await request(app)
//         .patch("/posts/1")
//         .set("Authorization", "Bearer " + access_token_user1)
//         .send(new_post_2);

//       console.log(body);
//       expect(status).toBe(200);
//       expect(body).toBeInstanceOf(Object);
//       expect(body).toHaveProperty("id", expect.any(Number));
//       expect(body).toHaveProperty("title", expect.any(String));
//       expect(body).toHaveProperty("content", expect.any(String));
//       expect(body).toHaveProperty("imgUrl");
//       expect(body).toHaveProperty("CategoryId", expect.any(Number));
//       expect(body).toHaveProperty("AuthorId", expect.any(Number));
//     });
//   });

//   describe("Failed", () => {
//     describe("Authentication Failed", () => {
//       test("Failed when user is not logging in when trying to update a post's image by id", async () => {
//         const { status, body } = await request(app)
//           .patch("/posts/1")
//           .send(new_post_2);

//         // console.log(body);
//         expect(status).toBe(401);
//         expect(body).toHaveProperty("message", "Unauthenticated");
//       });

//       test("Failed when user's token is invalid when trying to update a post's image by id", async () => {
//         const { status, body } = await request(app)
//           .patch("/posts/1")
//           .set("Authorization", "Bearer dsafdsafdsrtewefasdf")
//           .send(new_post_2);

//         // console.log(body);
//         expect(status).toBe(401);
//         expect(body).toHaveProperty("message", "Unauthenticated");
//       });
//     });

//     describe("Post Not Found", () => {
//       test("Failed getting a post when the post's id is unavailable", async () => {
//         const { status, body } = await request(app)
//           .patch("/posts/0")
//           .set("Authorization", "Bearer " + access_token_user1)
//           .send(new_post_2);

//         // console.log(body);
//         expect(status).toBe(404);
//         expect(body).toHaveProperty("message", "Post not found");
//       });
//     });

//     describe("Authorization Failed", () => {
//       test("Failed when user's role is not an admin when trying to update a post's image by id", async () => {
//         const { status, body } = await request(app)
//           .patch("/posts/1")
//           .set("Authorization", "Bearer " + access_token_user2)
//           .send(new_post_2);

//         console.log(body);
//         expect(status).toBe(403);
//         expect(body).toHaveProperty("message", "Unauthorized");
//       });
//     });
//   });
// }); //!!!

describe("DELETE /posts/:postId", () => {
  describe("Failed", () => {
    describe("Authentication Failed", () => {
      test("Failed when user is not logging in when trying to delete a post by id", async () => {
        const { status, body } = await request(app).delete("/posts/1");

        // console.log(body);
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Unauthenticated");
      });

      test("Failed when user's token is invalid when trying to delete a post by id", async () => {
        const { status, body } = await request(app)
          .delete("/posts/1")
          .set("Authorization", "Bearer dsafdsafdsrtewefasdf");

        // console.log(body);
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Unauthenticated");
      });
    });

    describe("Post Not Found", () => {
      test("Failed deleting a post when the post's id is unavailable", async () => {
        const { status, body } = await request(app)
          .delete("/posts/0")
          .set("Authorization", "Bearer " + access_token_user1);

        // console.log(body);
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Post not found");
      });
    });

    describe("Authorization Failed", () => {
      test("Failed when user's role is not an admin when trying to delete a post by id", async () => {
        const { status, body } = await request(app)
          .delete("/posts/1")
          .set("Authorization", "Bearer " + access_token_user2);

        console.log(body);
        expect(status).toBe(403);
        expect(body).toHaveProperty("message", "Unauthorized");
      });
    });
  });

  describe("Success", () => {
    test("success deleting a post by post's id", async () => {
      const { status, body } = await request(app)
        .delete("/posts/1")
        .set("Authorization", "Bearer " + access_token_user1);

      console.log(body);
      expect(status).toBe(200);
      expect(body).toHaveProperty("message");
    });
  });
});
