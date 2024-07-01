const dbConnect = require('../config/database');
const {promisify}  = require('util');


const promise_connection = promisify(dbConnect.query).bind(dbConnect);

const createTableQuery = `
CREATE TABLE IF NOT EXISTS clri (
    id INT AUTO_INCREMENT PRIMARY KEY,
    plant VARCHAR(255),
    department VARCHAR(255),
    section VARCHAR(255),
    machineName VARCHAR(255),
    pmFrequency INT,
    pmType VARCHAR(255),
    pmTeamMember VARCHAR(255),
    pmDate DATE,
    pmStartTime VARCHAR(255),
    pmFinishTime VARCHAR(255),
    Cleaning JSON,
    Lubrication JSON,
    Inspection JSON,
    Retightning JSON,
    remarks TEXT
);
`;

(async () => {
    try {
        const results = await promise_connection(createTableQuery);
        console.log('Table created successfully');
    } catch (err) {
        console.error('Error creating table');
    }
})();
