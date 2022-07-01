// Initializing dependencies 
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express(); 
const port = 5000; 

const Api = require("./api");

//// Middlewares
// to parse req.body to json data
app.use(express.json());
app.use(cors());


mongoose.connect("mongodb://localhost/shipment-portal", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Checking Database Connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("MongoDB connected successfully");
});

//// Routes
app.get("/", (req, res) => {
  res.send("Hello from the Server!! ✌");
});
// Api routes
app.use("/api/shipment", Api);

//// Listener's
app.listen(port, () => {
  console.log(`Server is Listining On https://localhost:${port}`);
});
