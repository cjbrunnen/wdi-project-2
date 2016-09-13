const express = require('express');
const router  = express.Router();

const authenticationsController = require("../controllers/authentications");
const restaurantsController     = require("../controllers/restaurants");


router.route("/register")
  .post(authenticationsController.register);
router.route("/login")
  .post(authenticationsController.login);
router.route("/restaurants")
  .get(restaurantsController.index);
// router.route("/restaurants/:id")
//   .get(restaurants.show);


module.exports = router;
