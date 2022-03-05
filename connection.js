'use strict';

const sqlConfig = {
    server: 'localhost',
    database: 'StudentRecord',
    user: 'sa',
    password: 'Passw0rd2020',
    synchronize: true,
    trustServerCertificate: true,
    // Option:
    // {
    //     encrypt: true,
    //     trustServerCertificate: false
    // }
}

module.exports = sqlConfig