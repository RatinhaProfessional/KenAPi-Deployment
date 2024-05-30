const Quote = require("../models/quotes");
const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../server");

chai.use(chaiHttp);

describe("Api Routes Test Collection", () => {
  it("Test default api GET route", (done) => {
    chai
      .request(server)
      .get("/api/quotes")
      .end((err, res) => {
        res.body.should.be.a("object");
        console.log(res.body.message);
        done();
      });
  });

  it("Test api GET all route", (done) => {
    chai
      .request(server)
      .get("/api/quotes/all")
      .end((err, res) => {
        res.body.should.be.a("array");
        res.body.length.should.be.equal(0);
        done();
      });
  });
});
