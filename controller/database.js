



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