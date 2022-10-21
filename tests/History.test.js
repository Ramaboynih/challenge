const request = require("supertest");
const app = require("../app");

//create history
describe("POST /api/History/add", () => {
    it("Should create data", async() => {
        const username = "Ramaido";
        const score = 9000;
        const user_id = 11;
        const res = await request(app)
            .post("/api/history/add")
            .set({
                Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjY2Mjg0NTY2fQ.HkoKohz7JHJC5oeDga54Ua9Ll1OMnwiGvogiWCKPg8U",
            })
            .send({ username, score, user_id });
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe("Success");
    });
});

//get ambil history
describe("GET /api/History/all", () => {
    it("Should get all data", async() => {
        const res = await request(app)
            .get("/api/History/all")
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body.status).toBe(true);
                expect(res.body.message).toBe("success");
            });
    });
});
describe.only("GET /api/History/11", () => {
    it("Should get data", async() => {
        await request(app)
            .get("/api/history/11")
            .set({
                Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjY2Mjg0NTY2fQ.HkoKohz7JHJC5oeDga54Ua9Ll1OMnwiGvogiWCKPg8U",
            })
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body.status).toBe(true);
                expect(res.body.message).toBe("success");
            });
    });
});