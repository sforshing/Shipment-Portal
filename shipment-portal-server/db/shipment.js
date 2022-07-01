const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const shipmentSchema = new Schema({
  // _id -> by default mongoose will make unique id for each documents

  blnumber: {
    type: String, // Defining the data type
    text: true, // Declares a full text index. //to make is accessible for searching
  },
  status: {
    type: String,
    text: true,
  },
});

// which is named "Shipment" for this collection of data
const shipment = mongoose.model("Shipment", shipmentSchema);

// Exporting it to use in other files (i.e. api.js/routes.js/controllers.js)
module.exports = shipment;
