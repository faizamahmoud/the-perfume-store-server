/* supertest to test routes*/
/* describe() - groups together a set of individual tests related to it*/ 
const app = require("../index.js");
const supertest = require("supertest");
const request = supertest("https://localhost4000/")

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
        
    });
});


// describe("Auth Controller Tests", () => {
//   beforeAll(async () => {
//     await User.deleteMany({});
//   });

// describe("POST /auth/register", () => {
//     it("should create a new user and return a token", async () => {
//         const res = await request(app)
//             .post("/auth/register")
//             .send({
//                 name: "flower",
//                 username: "power",
//                 email: "flowerPower@example.com",
//                 password: "password123",
//             });

//         expect(res.statusCode).toEqual(201);
//         expect(res.body).toHaveProperty("token");
//     });
// });

// describe("POST /auth/login", () => {
//     it("should authenticate a user and return a token", async () => {
//         const res = await request(app)
//             .post("/auth/login")
//             .send({
//                 username: "testuser",
//                 password: "password123",
//             });

//         expect(res.statusCode).toEqual(201);
//         expect(res.body).toHaveProperty("token");
//     });
// });

afterAll(async (done) => {
    await mongoose.connection.close();
    // done();
});



/*
This piece of code is for getting the authorization token after login to your app.
const token;
test("Login to the application", function(){
    return request.post(``).then((response)=>{
        token = response.body.token  //to save the login token for further requests
    })
}); 
/*
POST
describe("given a username and password", () => {
    * should save the username and password to the db
    *should respond with a json obj containing the user id
    * respond with a 200 status code
    * should specificy json in the content type header
})


module.exports = 
{
    request
        //, token     -- export if token is generated
}
*/
