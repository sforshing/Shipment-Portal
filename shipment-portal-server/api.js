const express = require("express");
// Importing shipment file exports & Initializing it with ShipmentDB
const ShipmentDB = require("./db/shipment");

const router = express.Router();



// To Create Demo Data for first time
router.get("/CreateDemoData", (req, res) => {
  ShipmentDB.create([
    { blnumber: "BL9234567", status: "Onboard" },
    { blnumber: "BL1256458", status: "Onboard" },
    { blnumber: "BL5678453", status: "Delivered" },
    { blnumber: "BL9256767", status: "Onboard" },
    { blnumber: "BL5626458", status: "Onboard" },
    { blnumber: "BL1458453", status: "Arrived Depot" },
  ]);
  res.send("Demo Data Created!!");
});

// Get Number of shipment onboard is DB
router.get("/totalOnboard", (req, res) => {
  ShipmentDB.countDocuments({ status: "Onboard" }, function (err, count) {
    if (err) res.status(400).json("Error: " + err);
    // console.log("there are %d shipment onboard", count);
    res.send({ count });
  });
});

// Get all Shipment
router.get("/all", (req, res) => {
  ShipmentDB.find(function (err, data) {
    if (err) return res.status(400).json("Error: " + err);
    // console.log(data);
    res.send(data);
  });
});

// Find Specific shipment by status & blnumber
router.post("/find", (req, res) => {
  // console.log(req.body);

  /*  On post request we recieve data in "req.body" & here we are recieving data as
  a json object.
  So it will be like :
  req.body =
    {
      "query":{
        "blnumber":"bl123",
        "status":"Onboard"
      }
    }

  */

  let query = req.body.query;
  /*
    query = {
        "blnumber":"bl123",
        "status":"Onboard"
      }
  */


  if (query.blnumber?.trim()) {
    

    let array = query.blnumber.split(",");
    
    let newArr = [];
    array.forEach((a) => {
      a.trim() && newArr.push(new RegExp(a, "i"));
      // a && newArr.push(new RegExp(a, "i"));
    });

    array = newArr;
    console.log("Array->", array);
    query.blnumber = { $in: array };

  
  }

  console.log({ query });

  ShipmentDB.find(query, (err, data) => {
    if (err) {
      res.status(400).json("Error: " + err);
    } else {
      // console.log(data);
      // res.json(data);
      res.send(data);
    }
  });
});


router.post("/search", async (req, res) => {
  // 1st Method
  // ShipmentDB.find(
  //   {
  //     $text: {
  //       $search: req.body.query,
  //     },
  //   },
  //   (err, docs) => {
  //     if (err) {
  //       res.status(400).json("Error: " + err);
  //     } else {
  //       // console.log(data);
  //       // res.json(data);
  //       res.send(docs);
  //     }
  //   }
  // );

  // 2nd Method
  let docs;

  //To search a value both fields (i.e blnumber & status)
  try {
    docs = await ShipmentDB.aggregate([
      {
        $match: {
          $or: [
            {
              blnumber: {
                $regex: req.body.query,
                $options: "i",
              },
            },
            {
              status: {
                $regex: req.body.query,
                $options: "i",
              },
            },
          ],
        },
      },
    ]);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }

  // console.log({ docs });
  res.send(docs);
});

router.post("/update/:id", (req, res) => {
  // console.log(req.body.query, req.params.id);
  ShipmentDB.updateOne({ _id: req.params.id }, req.body.query, (err, data) => {
    if (err) {
      res.status(400).json("Error: " + err);
    } else {
      // res.json("Location Updated");
      // console.log(data);
      res.send(data);
    }
  });
});
// router("",(req,res)=>{})

module.exports = router;
