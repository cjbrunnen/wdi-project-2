const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name:     { type: String, trim: true, required: true },
  lat:      { type: String, time: true, required: true },
  lng:      { type: String, time: true, required: true },
  url:      { type: String, trim: true },
  address:  { type: String, trim: true }
}, {
  timestamps: true
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
