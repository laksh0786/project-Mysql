//importing the modules
const express = require("express");
const cors = require("cors");

// Database configuration file
const dbConnect = require("./config/database");

//importing the routes
const clriRouter = require("./routes/clriRoutes");
const cbfRouter = require("./routes/cbfRoute");
const machineHealthRouter = require("./routes/machineHealthRoutes");

//creating the express app
const app = express();

//using the modules
app.use(cors());


require("dotenv").config(); //loading the env variables to the process.env


//middleware to parse the json data
app.use(express.json());


// mount the routes
app.use("/clri" , clriRouter);
app.use("/cbf" , cbfRouter);
app.use("/machine-health" , machineHealthRouter); 



//listening to the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}`);
});


