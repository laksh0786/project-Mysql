//importing the schema
const dbConnect = require("../config/database");
const { promisify } = require('util');


const promise_connection = promisify(dbConnect.query).bind(dbConnect);


//controller to add the clri data
exports.addClri = async (req, resp) => {

    try {

        const clriData = req.body;

        console.log(clriData);

        const insertQuery = `INSERT INTO clri(plant, department, section, machineName, pmFrequency, pmType, pmTeamMember, pmDate, pmStartTime, pmFinishTime, Cleaning, Lubrication, Inspection, Retightning, remarks) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            clriData.plant,
            clriData.department,
            clriData.section,
            clriData.machineName,
            clriData.pmFrequency,
            clriData.pmType,
            clriData.pmTeamMember,
            clriData.pmDate,
            clriData.pmStartTime,
            clriData.pmFinishTime,
            JSON.stringify(clriData.Cleaning),
            JSON.stringify(clriData.Lubrication),
            JSON.stringify(clriData.Inspection),
            JSON.stringify(clriData.Retightning),
            clriData.remarks
        ];

        // console.log(insertQuery , values);

        const result = await promise_connection(insertQuery, values);

        console.log(result);

        //sending the response to the client
        return resp.status(200).json({
            success: true,
            message: "Data added successfully",
            result
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


//controller to get all the clri data
exports.getClri = async (req, resp) => {

    try {
        const selectQuery = `
            SELECT * FROM clri
        `;

        const clriData = await promise_connection(selectQuery);
        return resp.status(200).json({
            success: true,
            message: "Data fetched successfully",
            data: clriData
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
exports.getClriById = async (req, resp) => {

    try {

        //fetching the id from the request
        const id = req.params.id;
        // const { id } = req.query;

        //fetching the data from the database
        const selectQuery = `SELECT * FROM clri WHERE id = ?`;

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