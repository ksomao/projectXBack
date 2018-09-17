const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
import address from "./data"

const API_PORT = 3001;
const app = express();
const router = express.Router();

// this is our MongoDB database
const dbRoute = "mongodmongodb://solid:b6Hk4UgaWLenEBf@ds149732.mlab.com:49732/address";

// connects our back end code with the database
mongoose.connect(
    dbRoute,
    {useNewUrlParser: true}
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger("dev"));

// this is our get method
// this method fetches all available data in our database
router.get("/getData", (req, res) => {
    /*address.find({}).limit(1).exec((err, data) => {
        if (err) return res.json({success: false, error: err});
        return res.json({success: true, data});
    });*/

    /*   let closestQuery = address.find({
           loc: {$near: ["4.34639", "50.88049"]}
       }).limit(1).exec();*/

    const coords = {type: 'Point', coordinates: [4.371364199999999, 50.83472750000001]};

    /*address.find({
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [4.371364199999999, 50.83472750000001]
                }
            }
        }
    }).find((error, results) => {
        if (error) console.log("my error",error);
        console.log("res",JSON.stringify(results));
    });*/

    address.find({loc: {$near: [4.371364199999999, 50.83472750000001], $maxDistance: 2000}}, function (err, result) {
        console.log(result);
    });
});

// this is our update method
// this method overwrites existing data in our database
router.get("/updateData", (req, res) => {

    address.find({"loc": {$exists: true}})

    /*    const id = "5b97d7752a01c60e403bec81";
        address.findOneAndUpdate(id, {status: "true"}, {new: true},
            (err, data) => {
                if (err) return res.json({success: false, error: err});
                return res.json({success: true, data});
            });*/
});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteData", (req, res) => {
    const {id} = req.body;
    Data.findOneAndDelete(id, err => {
        if (err) return res.send(err);
        return res.json({success: true});
    });
});

// this is our create methid
// this method adds new data in our database
router.post("/putData", (req, res) => {
    let data = new Data();

    const {id, message} = req.body;

    if ((!id && id !== 0) || !message) {
        return res.json({
            success: false,
            error: "INVALID INPUTS"
        });
    }
    data.message = message;
    data.id = id;
    data.save(err => {
        if (err) return res.json({success: false, error: err});
        return res.json({success: true});
    });
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));