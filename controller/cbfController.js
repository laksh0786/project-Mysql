const dbConnect = require('../config/database');
const { promisify } = require('util');


const promise_connection = promisify(dbConnect.query).bind(dbConnect);


//adding the cbf data to the table
exports.addCbf = async (req, resp) => {

    try {

        const cbfData = req.body;

        console.log(cbfData);

        const insertQuery = `INSERT INTO cbf(unit, machineName, machineNo, buffingDate, cotsDescription, cotsDia, cotsMake, doneBy, verifiedBy, remarks) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            cbfData.unit,
            cbfData.machineName,
            cbfData.machineNo,
            cbfData.buffingDate,
            cbfData.cotsDescription,
            cbfData.cotsDia,
            cbfData.cotsMake,
            cbfData.doneBy,
            cbfData.verifiedBy,
            cbfData.remarks
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
    }catch(err){
        console.log(err);
        return resp.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        })
    }
}