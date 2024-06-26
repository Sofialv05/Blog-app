const app = require("../app");
const request = require("supertest");
const { sequelize, User } = require("../models");
// const { encrypt } = require("../helpers/bycript");
const { signToken } = require("../helpers/jwt");
const { queryInterface } = sequelize;

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

let access_token = "";
let access_token2 = "";
beforeAll(async () => {
  let user = await User.create(admin_test);
  let user2 = await User.create(user_test_1);

  access_token = signToken({
    id: user.id,
    role: user.role,
  });

  access_token2 = signToken({
    id: user2.id,
    role: user2.role,
  });
});

afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});

describe("POST /add-user", () => {
  describe("Success", () => {
    test("success add new user with the role staff", async () => {
      const { status, body } = await request(app)
        .post("/add-user")
        .set("Authorization", "Bearer " + access_token)
        .send(user_test_2);

      console.log(body);
      expect(status).toBe(201);
      expect(body).toHaveProperty("email", user_test_2.email);
      expect(body).toHaveProperty("id", expect.any(Number));
    });
  });

  describe("Failed", () => {
    test("failed when user register with registered email", async () => {
      const { status, body } = await request(app)
        .post("/add-user")
        .set("Authorization", "Bearer " + access_token)
        .send(user_test_1);

      console.log(body);
      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "This email is already in use");
    });

    test("failed when user doesn't input password", async () => {
      const { status, body } = await request(app)
        .post("/add-user")
        .set("Authorization", "Bearer " + access_token)
        .send({ email: "haha@gmail.com" });

      console.log(body);
      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "password is required");
    });

    test("failed when user doesn't input email", async () => {
      const { status, body } = await request(app)
        .post("/add-user")
        .set("Authorization", "Bearer " + access_token)
        .send({ password: "1234567" });

      console.log(body);
      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "email is required");
    });

    test("failed when user input invalid email format", async () => {
      const { status, body } = await request(app)
        .post("/add-user")
        .set("Authorization", "Bearer " + access_token)
        .send({ email: "hahaa", password: "1241245" });

      console.log(body);
      expect(status).toBe(400);
      expect(body).toHaveProperty(
        "message",
        "Please provide a valid email address"
      );
    });

    test("failed when user input password is less than 5 characters", async () => {
      const { status, body } = await request(app)
        .post("/add-user")
        .set("Authorization", "Bearer " + access_token)
        .send({ email: "cat@gmail.com", password: "abc" });

      console.log(body);
      expect(status).toBe(400);
      expect(body).toHaveProperty(
        "message",
        "Password must be at least 5 characters"
      );
    });
  });

  describe("Unauthenticated", () => {
    test("failed when unregistered user tried to access /add-user", async () => {
      const { status, body } = await request(app).post("/add-user");

      console.log(body);
      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "Unauthenticated");
    });
  });

  describe("Forbidden", () => {
    test("failed when user with the role other than admin tried to access /add-user", async () => {
      const { status, body } = await request(app)
        .post("/add-user")
        .set("Authorization", "Bearer " + access_token2);

      console.log(body);
      expect(status).toBe(403);
      expect(body).toHaveProperty("message", "Unauthorized");
    });
  });
});

describe("POST /login", () => {
  describe("Success", () => {
    test("success login with registered user", async () => {
      const { status, body } = await request(app)
        .post("/login")
        .send(user_test_1);

      console.log(body);
      expect(status).toBe(200);
      expect(body).toHaveProperty("access_token", expect.any(String));
    });
  });

  describe("Failed", () => {
    test("failed login with unregistered user", async () => {
      const { status, body } = await request(app)
        .post("/login")
        .send({ email: "hahaa@gmail.com", password: "121312312" });

      console.log(body);
      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "Email has not been registered");
    });

    test("failed login when user doesn't input email", async () => {
      const { status, body } = await request(app)
        .post("/login")
        .send({ password: "121312312" });

      console.log(body);
      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "Email is required");
    });

    test("failed login when user doesn't input password", async () => {
      const { status, body } = await request(app)
        .post("/login")
        .send({ email: "hahaa@gmail.com" });

      console.log(body);
      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "Password is required");
    });

    test("failed login when user input the invalid password", async () => {
      const { status, body } = await request(app)
        .post("/login")
        .send({ email: "test2@gmail.com", password: "123" });

      console.log(body);
      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "Invalid password");
    });
  });
});
