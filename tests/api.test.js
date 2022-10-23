const supertest = require("supertest");
const app = require("../app");
const truncate = require("../helpers/truncate");
truncate.user();
truncate.userBio();
truncate.userHistory();

// endpoint Register
const userTest = {
    email: "user@test.com",
    username: "userTest",
    password: "password123",
    user_id: 1,
};

const bioTest = {
    bio: "Bio Test",
};
const bioUpdateTest = {
    bio: "User Udate",
};

const scoreTest = {
    score: 1000,
};

var data = "";

var token = "";

describe("/api/auth endpoint", () => {
    test("register berhasil", async() => {
        try {
            const res = await supertest(app).post("/api/auth").send(userTest);

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty("status");
            expect(res.body).toHaveProperty("message");
            expect(res.body).toHaveProperty("data");
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe("Account Created");
            expect(res.body.data).toStrictEqual({
                email: userTest.email,
                username: userTest.username,
            });
        } catch (error) {
            expect(error).toBe("error");
        }
    });
});

// register gagal karena email sudah dipakai
test("register gagal", async() => {
    try {
        const res = await supertest(app).post("/api/auth").send(userTest);

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe("Email Already Used");
        expect(res.body.data).toBe(null);
    } catch (err) {
        expect(err).toBe("error"); // test gagal karena err != 'error'
    }
});

// Test Login
describe("/api/auth/login endpoint", () => {
    // login gagal
    test("login gagal", async() => {
        try {
            const res = await supertest(app)
                .post("/api/auth/login")
                .send({
                    email: userTest.email,
                    password: `${userTest.password}4`,
                });

            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty("status");
            expect(res.body).toHaveProperty("message");
            expect(res.body).toHaveProperty("data");
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe("Email / Password doesn't match");
            expect(res.body.data).toBe(null);
        } catch (err) {
            expect(err).toBe("error"); // test gagal karena err != 'error'
        }
    });
});
// login berhasil
test("login berhasil", async() => {
    try {
        const res = await supertest(app).post("/api/auth/login").send({
            email: userTest.email,
            password: userTest.password,
        });

        token = res.body.data.token;

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.data).toHaveProperty("token");
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe("Success Login");
    } catch (err) {
        expect(err).toBe("error"); // test gagal karena err != 'error'
    }
});
// Test Add Bio
describe("/api/userBio/add endpoint", () => {
    test("Add Bio Berhasil", async() => {
        try {
            const res = await supertest(app)
                .post("/api/userBio/add")
                .set({ Authorization: token })
                .send({
                    bio: bioTest.bio,
                });
            data = res.body.data;
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty("status");
            expect(res.body).toHaveProperty("message");
            expect(res.body).toHaveProperty("data");
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe("Bio Created");
            expect(res.body.data).toHaveProperty("username");
            expect(res.body.data).toHaveProperty("bio");
            expect(res.body.data).toHaveProperty("user_id");
            expect(res.body.data).toEqual(data);
            // kenapa paka toEqual?
            // Karena datanyanya adl object jadi harus pake toEqual
            // ok? naisu wkwkw
            // dah. lanjut sann wkwk
        } catch (err) {
            expect(err).toBe("error"); // test gagal karena err != 'error'
        }
    });
});
//login gagal
test("Add Bio Gagal", async() => {
    try {
        const res = await supertest(app)
            .post("/api/userBio/add")
            .set({ Authorization: token })
            .send({
                bio: bioTest.bio,
            });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe("You've Already Created a Bio");
        expect(res.body.data).toBe(null);
    } catch (err) {
        expect(err).toBe("error"); // test gagal karena err != 'error'
    }
});
//test show all bio
describe("/api/index endpoint", () => {
    test("Show All Data Berhasil", async() => {
        try {
            const res = await supertest(app)
                .get("/api/userBio")
                .then((res) => {
                    data = res.body.data;
                    expect(res.statusCode).toBe(200);
                    expect(res.body).toHaveProperty("status");
                    expect(res.body).toHaveProperty("message");
                    expect(res.body).toHaveProperty("data");
                    expect(res.body.status).toBe(true);
                    expect(res.body.message).toBe("Success Get All Data");
                    expect(res.body.data).toEqual(data);
                });
        } catch (err) {
            expect(err).toBe("error"); // test gagal karena err != 'error'
        }
    });
});
// Test Show By Id
describe("/api/1 endpoint", () => {
    test("Show Data By Id Gagal", async() => {
        try {
            const res = await supertest(app)
                .get("/api/userBio/5")
                .then((res) => {
                    expect(res.statusCode).toBe(400);
                    expect(res.body).toHaveProperty("status");
                    expect(res.body).toHaveProperty("message");
                    expect(res.body).toHaveProperty("data");
                    expect(res.body.status).toBe(false);
                    expect(res.body.message).toBe("Data Not Exist");
                    expect(res.body.data).toBe(null);
                });
        } catch (err) {
            expect(err).toBe("error"); // test gagal karena err != 'error'
        }
    });
});
test("Show Data By Id Berhasil", async() => {
    try {
        const res = await supertest(app)
            .get(`/api/userBio/${userTest.user_id}`)
            .then((res) => {
                data = res.body.data;
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty("status");
                expect(res.body).toHaveProperty("message");
                expect(res.body).toHaveProperty("data");
                expect(res.body.status).toBe(true);
                expect(res.body.message).toBe("Success Get Data");
                expect(res.body.data).toBe(data);
            });
    } catch (err) {
        expect(err).toBe("error"); // test gagal karena err != 'error'
    }
});
// Test Update & Delete
describe("/api/update & api/1 endpoint", () => {
    test("Update Berhasil", async() => {
        try {
            const res = await supertest(app)
                .put("/api/userBio/update/")
                .set({ Authorization: token })
                .send({
                    bio: bioUpdateTest.bio,
                });
            data = res.body.data;
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty("status");
            expect(res.body).toHaveProperty("message");
            expect(res.body).toHaveProperty("data");
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe("Bio Updated");
            expect(res.body.data).toBe(data);
            // kenapa ada data?
            // Karena data itu diambil dari res.body endpoint update
        } catch (err) {
            expect(err).toBe("error"); // test gagal karena err != 'error'
        }
    });
    test("Delete Berhasil", async() => {
        try {
            const res = await supertest(app)
                .delete("/api/userBio/delete/")
                .set({ Authorization: token })
                .send({
                    bio: bioUpdateTest.bio,
                });
            data = res.body.data;
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty("status");
            expect(res.body).toHaveProperty("message");
            expect(res.body).toHaveProperty("data");
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe("Success Delete Data");
            expect(res.body.data).toBe(data);
            // kenapa ada data?
            // Karena data itu diambil dari res.body endpoint update
        } catch (err) {
            expect(err).toBe("error"); // test gagal karena err != 'error'
        }
    });
    test("Update Gagal", async() => {
        try {
            const res = await supertest(app)
                .put("/api/userBio/update/")
                .set({ Authorization: token })
                .send({
                    bio: bioUpdateTest.bio,
                });
            data = res.body.data;
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty("status");
            expect(res.body).toHaveProperty("message");
            expect(res.body).toHaveProperty("data");
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe("You've Haven't Created Bio Yet");
            expect(res.body.data).toBe(null);
            // kenapa ada data?
            // Karena data itu diambil dari res.body endpoint update
        } catch (err) {
            expect(err).toBe("error"); // test gagal karena err != 'error'
        }
    });
});