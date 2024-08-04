const express = require("express");
const router = express.Router();


//importing the controller
const { addMachineHealthData, getAllMcHealthForms, getMcHealthById, machineDataVerification } = require("../controller/machineHealth");



//creating the routes
router.post("/add-data" , addMachineHealthData);
router.get("/get-all" , getAllMcHealthForms);
router.get("/get-by-id/:id" , getMcHealthById);
router.put('/verify-form/:id' , machineDataVerification);







//exporting the router
module.exports = router;