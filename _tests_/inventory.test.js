const createServer = require("../utils/server");
const supertest = require("supertest");
const { connect, close } = require('../config/db.connection');

describe("perfumes", () => {
  let app;
  let server;

  beforeAll(async () => {
    await connect();
    app = createServer();
    server = app.listen(0);
  });

  afterAll(async () => {
    await close();
    server.close();
  });

  describe("get perfumes", () => {
    describe("get perfumes route", () => {
      describe("given the product does not exist", () => {
        it("should return a 404", async () => {
          
          await supertest(app).get(`/`).expect(404);
        });
      });
      describe("get all perfumes", () => {
        it("should return a list of perfumes", async () => {
          
          await supertest(app).get('/inventory').expect(200);
        });
      });
      // describe("get one perfume", () => {
      //   it("should return a perfume", async () => {
          
      //     await supertest(app).get('/:id').expect(200);
      //   });
      // });
    });
    //   test("get perfumes", () =>{
    //     const response =  request(app).get(`/`).send({
    //       "message":"we;re here"
    //   })
    //   expect(response.statusCode).toBe(200)
    // })
  });
});
