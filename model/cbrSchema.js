const dbConnect = require('../config/database');
const {promisify}  = require('util');


const promise_connection = promisify(dbConnect.query).bind(dbConnect);


const createTableQuery = `
CREATE TABLE IF NOT EXISTS cbf(
    id INT AUTO_INCREMENT PRIMARY KEY,
    unit VARCHAR(255),
    machineName VARCHAR(255),
    machineNo VARCHAR(255),
    buffingDate DATE,
    cotsDescription VARCHAR(255),
    cotsDia VARCHAR(255),
    cotsMake VARCHAR(255),
    doneBy VARCHAR(255),
    verifiedBy VARCHAR(255),
    remarks TEXT
);
`;


(async () => {
    try {
        const results = await promise_connection(createTableQuery);
        console.log('Table created successfully');
    } catch (err) {
        console.error('Error creating table');
    } finally {
        dbConnect.end();
    }
})();