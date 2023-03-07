/* supertest to test routes*/
/* describe() - groups together a set of individual tests related to it*/ 
const app = require("../index.js");
const request = require("supertest");
const supertest = require("supertest");




// GET requests to api/users endpoint, calls supertest.get()
describe("perfumes", () =>{

  describe("get perfumes route", () =>{
    describe("given the product does not exist", () =>{
      it("should return a 404", async () =>{
        const id = 'perfume 123'
        await supertest().get()
      })
    })
  })
      //   test("get perfumes", () =>{
      //     const response =  request(app).get(`/`).send({
      //       "message":"we;re here"
      //   })
      //   expect(response.statusCode).toBe(200)
      // })
  
  });