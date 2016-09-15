const mongoose   = require("mongoose");
const Bluebird   = require("bluebird");
mongoose.Promise = Bluebird;
const rp         = require("request-promise");
const config     = require("../config/config");
const Restaurant = require("../models/restaurant");

// Building the query
const q          = encodeURIComponent("breakfast");
const lat        = 50.822545;
const lon        = -0.1439147;
const radius     = 8000;
const count      = 20;
// const collection = "breakfast";
let start        = 0;
// let uri          = `https://developers.zomato.com/api/v2.1/collections?city_id=327&search?q=${q}&count=${count}&lat=${lat}&lon=${lon}&radius=${radius}&start=${start}`;
// let uri          = `https://developers.zomato.com/api/v2.1/search?entity_id=327&entity_type=zone&establishment_type1`

let uri = `https://developers.zomato.com/api/v2.1/search?&lat=${lat}&lon=${lon}&radius=${radius}`;

// &city_id=327;
// &entity_type=city
// q=${q}&lat=${lat}&lon=${lng}&radius=${radius}&count=${count}&start=${start}

mongoose.connect(config.db);

// Clear the restaurants from the database
Restaurant.collection.drop();

function getRestaurants(uri){
  let options = {
    uri: uri,
    headers: {
      "user-key": process.env.ZOMATO_API_KEY
    }
  };

  // Making a request with Request Promise
  return rp(options)
    .then(data => {
      // console.log(data);

      // Parse the data (which comes back as a string)
      let json = JSON.parse(data);
      if (json.restaurants.length === 0) return;

      // A way of "collecting" promises in an array and waiting until they are all furfilled
      return Bluebird.map(json.restaurants, (result) => {
        let restaurantData   = {};
        restaurantData.name  = result.restaurant.name;
        restaurantData.url   = result.restaurant.url;


        if (result.restaurant.location) {
          restaurantData.lat      = result.restaurant.location.latitude;
          restaurantData.lng      = result.restaurant.location.longitude;
          restaurantData.address  = result.restaurant.location.address;
        }

        restaurantData.image = result.restaurant.thumb;

        // Returns a promise
        return Restaurant.create(restaurantData);
      });
    })
    .then((data) => {
      if (!data) return process.exit();

      // Let us know what we did
      data.forEach(restaurant => Restaurant.create(restaurant));
      data.forEach(restaurant => console.log(`${restaurant.name} was saved: %o`, restaurant));

      // Make a new request increasing the starting number that we look from
      start += 20;
      // let uri = `https://developers.zomato.com/api/v2.1/search?q=${q}&count=${count}&lat=${lat}&lng=${lng}&radius=${radius}&start=${start}`;
      let uri = `https://developers.zomato.com/api/v2.1/search?&lat=${lat}&lon=${lon}&radius=${radius}&start=${start}`;

      // Recusively call the function getRestaurants
      return getRestaurants(uri);
    })
    .catch(console.error);
}

getRestaurants(uri);
