const express = require('express');
const router  = express.Router();

const authentications = require("../controllers/authentications");
const restaurants     = require("../controllers/restaurants");

router.route("/register")
  .post(authentications.register);
router.route("/login")
  .post(authentications.login);
// router.route("/restaurants")
//   .get();


router.route("/restaurants")
  .get(restaurants.index);
// router.route("/restaurants/:id")
//   .get(restaurants.show);


module.exports = router;
