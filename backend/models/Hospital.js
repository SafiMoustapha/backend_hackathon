const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  address: { type: String },
  phone: { type: String },
  type: { type: String, enum: ["public", "privé"], required: true } 
});

const Hospital = mongoose.model("Hospital", hospitalSchema);
module.exports = Hospital;
