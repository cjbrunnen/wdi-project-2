const specs       = require('../spec_helper');
const User        = require("../../models/user");
const Restaurant  = require("../../models/restaurant");

let TOKEN;

describe("Restaurants Controller Test", function(done) {
  beforeEach(done => {
    restaurant.collection.drop()
    .done();
  });
  describe("GET /api/restaurants", function(done) {
    beforeEach(done => {
      const user = new User ({
        username: "test",
        email:    "test@test.com",
        password: "password",
        passwordConfirmation: "password"
      });
      user.save((err, user) => {
        api.post('/api/login')
        .set("Accept", "application/json")
        .send ({
          email:    "test@test.com",
          password: "password"
        }).end((err, res => {
          TOKEN = res.body.token;
          done();
        }));
      });
    });
  });
});

    beforeEach(done => {
      const restaurant = new Restaurant({
        name:   "Aaa",
        lat:    "Aaa",
        lng:    "Aaa",
        url:    "Aaa",
        address:"Aaa",
      });
      restaurant.save((err, restaurant) => {
        done();
      });
    });
    it("should return a 200 response", function(done) {
      api
        .get('/api/restaurants/Aaa')
        .set('Accept', 'application/json')
        .set("Authorization", `Bearer ${TOKEN}`)
        .expect(200, done);
    });
