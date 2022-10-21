const request = require("supertest");
const app = require("../app");

describe.skip("POST /api/auth", () => {
    it("Should create data", async() => {
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
    it("Should create data", async() => {
        const email = "ramaajo@gmail.com";
        const password = "deny kapan nikah";
        const res = await request(app)
            .post("/api/auth/login")
            .send({ email, password });
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe("Success Login");
    });
});