const express = require("express");
const router = express.Router();


//importing the controller
const { addClri , getClri, getClriById } = require("../controller/clriController");



//creating the routes
router.post("/add-clri" , addClri);
router.get("/get-clri" , getClri);
router.get("/get-clri-form/:id" , getClriById);





//exporting the router
module.exports = router;