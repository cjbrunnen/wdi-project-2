module.exports = {
  index:  restaurantsIndex,
  // show:   restaurantsShow
};

const Restaurant = require("../models/restaurant");

function restaurantsIndex(req, res){
  Restaurant.find({}, (err, restaurants) => {
    if (err) return res.status(500).json({ message: "Something went wrong." });
    return res.status(200).json({ restaurants });
  });
}

// function restaurantsShow(req, res){
//   Restaurant.findById(req.params.id, (err, restaurant) => {
//     if (err) return res.status(500).json({ message: "Something went wrong." });
//     if (!restaurant) return res.status(404).json({ message: "No restaurant was found." });
//     return res.status(200).json({ restaurant });
//   });
// }
