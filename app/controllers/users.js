const db = require('../services/db');


async function getUsers() {
    var sql = 'SELECT * FROM users';
    let data = await db.query(sql);
    var users = [];
    for (var row of data ) {
        users.push({'id': row.id, 'username':row.name});
    }
    // Return an array of users
    return users;
}

async function getUser(user_id) {
    var sql = "SELECT * FROM users WHERE id = " + user_id;
    let data = await db.query(sql);
    return data;
}

module.exports =  {
    getUsers,
    getUser,
}