// const knex = require('knex')
// const mysql = require("mysql")


// var knex = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'rexweb@123',
//     database: 'dataBAse',
//     multipleStatements: true
// });
// mysqlConnection.connect((err) => {
//     if (!err)
//         console.log('Connection Established Successfully');
//     else
//         console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
// });


const knex = require('knex')({
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'rexweb@123',
      database: 'dataBAse'
    }
  });

  module.exports = knex



