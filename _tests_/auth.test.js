const app = require("../index.js");
const request = require("supertest");
const mongoose = require('mongoose');
const { User } = require("../models");

const { connect, close } = require('../config/db.connection.js');

describe('connect to mongoose then close', () => {
    beforeAll(async () => {
        await connect();
    });

    afterAll(async () => {
        await close();
    });

    test('should do something', () => {
        // Your test code here
    });
});


// describe("Auth Controller Tests", () => {
//   beforeAll(async () => {
//     await User.deleteMany({});
//   });

describe("POST /auth/register", () => {
    it("should create a new user and return a token", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send({
                name: "flower",
                username: "power",
                email: "flowerPower@example.com",
                password: "password123",
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("token");
    });
});

describe("POST /auth/login", () => {
    it("should authenticate a user and return a token", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({
                username: "testuser",
                password: "password123",
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("token");
    });
});

afterAll(async (done) => {
    await mongoose.connection.close();
    done();
});
