const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name:        { type: String, trim: true, required: true },
  image:       { type: String, trim: true, required: true },
  description: { type: String, trim: true },
  lat:         { type: String, time: true, required: true },
  lng:         { type: String, time: true, required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
