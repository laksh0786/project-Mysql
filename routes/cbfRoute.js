const express = require("express");
const router = express.Router();


//importing the controller
const {addCbf} = require("../controller/cbfController");


//creating the routes
router.post("/add-cbf", addCbf);



//exporting the router
module.exports = router;