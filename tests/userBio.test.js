const request = require("supertest");
const app = require("../app");

describe("GET /api/userBio", () => {
    it("Should get all data", async() => {
        const res = await request(app)
            .get("/api/userBio")
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body.status).toBe(true);
                expect(res.body.message).toBe("Success Get All Data");
            });
    });
});
describe("POST /api/userBio/add", () => {
    it("Should create data", async() => {
        const username = "admin";
        const bio = "admin123";
        const user_id = 1;
        const res = await request(app)
            .post("/api/userBio/add")
            .send({ username, bio, user_id });
        expect(res.statusCode).toBe(201);
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe("Bio Created");
    });
});
describe("PUT /api/userBio/update", () => {
    it("Should create data", async() => {
        const bio = "kevin";
        const user_id = 1;
        const res = await request(app)
            .put("/api/userBio/update")
            .set({
                Autorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjY2Mjg0NTY2fQ.HkoKohz7JHJC5oeDga54Ua9Ll1OMnwiGvogiWCKPg8U",
            })
            .send({ bio, user_id });
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe("Bio Updated");
    });
});
describe("GET /api/userBio/2", () => {
    it("Should get data", async() => {
        const res = await request(app)
            .get("/api/userBio/2")
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body.status).toBe(true);
                expect(res.body.message).toBe("Success Get Data");
            });
    });
});
describe.only("GET /api/userBio/delete", () => {
    it("Should delete data", async() => {
        const res = await request(app)
            .delete("/api/userBio/delete")
            .set({
                Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjY2Mjg0NTY2fQ.HkoKohz7JHJC5oeDga54Ua9Ll1OMnwiGvogiWCKPg8U",
            })
            .then((res) => {
                expect(res.statusCode).toBe(200); //kurang apa jadinya?
                expect(res.body.status).toBe(true); // user dah diambil dari tokennya
                expect(res.body.message).toBe("Success Delete Data");
            });
    });
});