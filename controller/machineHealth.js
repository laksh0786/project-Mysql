// Importing the schema
const dbConnect = require("../config/database");
const { promisify } = require('util');

const promise_connection = promisify(dbConnect.query).bind(dbConnect);

// Controller to add the data
exports.addMachineHealthData = async (req, resp) => {

    try {
        const data = req.body;

        console.log(data);

        // Updated insert query with new fields
        const insertQuery = `INSERT INTO mchineHealthDetails(
            plant,
            date,
            shift,
            machineFit,
            departments,
            inoperativeDetails,
            actionPlan,
            hodName,
            salaryCode
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            data.plant,
            data.date,
            data.shift,
            data.machineFit,
            JSON.stringify(data.departments),
            data.inoperativeDetails,
            data.actionPlan,
            data.hodName,
            data.salaryCode,
        ];

        // Console log for debugging
        // console.log(insertQuery, values);

        const result = await promise_connection(insertQuery, values);

        console.log(result);

        // Sending the response to the client
        return resp.status(200).json({
            success: true,
            message: "Data added successfully",
            result
        });

    } catch (err) {
        console.log(err);
        return resp.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
}


//controller to get all the clri data
exports.getAllMcHealthForms = async (req, resp) => {

    try {
        const selectQuery = `
            SELECT * FROM mchineHealthDetails
        `;

        const data = await promise_connection(selectQuery);
        return resp.status(200).json({
            success: true,
            message: "Data fetched successfully",
            data: data
        })
    } catch (err) {
        console.error('Error fetching data:', err);
        return resp.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        })
    }

}


//controller to get the clri data by id
exports.getMcHealthById = async (req, resp) => {

    try {

        //fetching the id from the request
        const id = req.params.id;
        // const { id } = req.query;

        //fetching the data from the database
        const selectQuery = `SELECT * FROM mchineHealthDetails WHERE id = ?`;

        const result = await promise_connection(selectQuery, [id]);

        //sending the response to the client
        return resp.status(200).json({
            success: true,
            message: "Data fetched successfully",
            data: result
        })

    } catch (err) {
        console.log(err);
        return resp.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        })
    }

}


//controller to verify the data
exports.machineDataVerification = async (req, resp) => {
    try {
        //fetching the id from the request
        const id = req.params.id;
        console.log(id , req.body.hodRemarks);  

        //fetching the data from the database
        const selectQuery = `SELECT * FROM mchineHealthDetails WHERE id = ?`;

        const result = await promise_connection(selectQuery, [id]);

        //checking if the data is available or not
        if (result.length === 0) {
            return resp.status(404).json({
                success: false,
                message: "Data not found"
            })
        }

        //updating the data
        const updateQuery = `UPDATE mchineHealthDetails SET verified = 1, hodRemarks = ? WHERE id = ?`;


        const updateResult = await promise_connection(updateQuery, [req.body.hodRemarks , id]);

        //sending the response to the client
        return resp.status(200).json({
            success: true,
            message: "Data verified successfully",
            data: updateResult
        })

    } catch (err) {
        console.log(err);
        return resp.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        })
    }
}


// CREATE TABLE mchineHealthDetails (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     plant VARCHAR(255) NOT NULL,
//     date varchar(255) NOT NULL,
//     shift ENUM('Morning', 'Afternoon', 'Night') NOT NULL,
//     machineFit ENUM('fit', 'unfit') NOT NULL,
//     departments JSON,
//     inoperativeDetails TEXT,
//     actionPlan TEXT,
//     hodName VARCHAR(255) NOT NULL,
//     salaryCode VARCHAR(255) NOT NULL,
//     verified INT DEFAULT 0,
//     hodRemarks TEXT,
//     status INT DEFAULT 0, -- Added status field with default value 0
//     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
// );