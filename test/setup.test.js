process.env.NODE_ENV = "test";
const Quote = require("../models/quotes");
const User = require("../models/user");

before((done) => {
  Quote.deleteMany({}, function (err) {});
  User.deleteMany({}, function (err) {});
  done();
});

after((done) => {
  Quote.deleteMany({}, function (err) {});
  User.deleteMany({}, function (err) {});
  done();
});
