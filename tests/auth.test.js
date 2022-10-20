const request = require("supertest");
const app = require("../app");

describe.skip("POST /api/auth", () => {
  it("Should create data", async () => {
    const email = "admin@gmail.com";
    const username = "admin";
    const password = "root";
    const res = await request(app)
      .post("/api/auth")
      .send({ email, username, password });
    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe(true);
    expect(res.body.message).toBe("Account Created");
  });
});

describe.skip("POST /api/auth/login", () => {
  it("Should create data", async () => {
    const email = "admin@gmail.com";
    const password = "root";
    const res = await request(app)
      .post("/api/auth/login")
      .set(
        "Authorization",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJkY0BnbWFpbC5jb20iLCJ1c2VybmFtZSI6IkRlZGR5IENvcmJ1emllciIsImlhdCI6MTY2NTA3NTg3OX0.SkfAl3QVLGxUllnj-6hvxCegnLv-jM8TnHLNIZwWLMc"
      )
      .send({ email, password });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe(true);
    expect(res.body.message).toBe("Success Login");
  });
});
