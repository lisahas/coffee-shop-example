const db = require('./db');

async function getShops(filter) {
    var sql = 'SELECT * FROM Shops';
    if (filter != 'all') {
        sql += ` WHERE shoptown = "${filter}"`;
    }
    console.log(sql);
    const data = await db.query(sql);
    console.log(data);
    const meta = { page: 1 };

    return {
        data,
        meta
    }
}

async function getTowns() {
    var ret = '';
    var sql = "SELECT DISTINCT shoptown FROM Shops";
    const data = await db.query(sql);
    for(var row of data) {
        ret += row.shoptown;
    }
    const meta = { page: 1 };
    console.log(ret);

    return {
        ret,
        meta
    }
}

module.exports = {
    getShops,
    getTowns
}