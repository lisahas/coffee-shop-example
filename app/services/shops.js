const db = require('./db');

async function getShops(filter) {
    var sql = 'SELECT * FROM Shops';
    if (filter != 'all') {
        sql += ` WHERE shoptown = "${filter}"`;
    }
    console.log(sql);
    const data = await db.query(sql);

    return {
        data
    }
}

async function getTowns() {
    var sql = "SELECT DISTINCT shoptown FROM Shops";
    const data = await db.query(sql);

    return {
        data
    }
}

async function getShop(id) {
    //TODO get the ratings and calcuate their average (and maybe number of raters)
    var sql = "SELECT * FROM Shops WHERE shop_id = " + id;
    const data = await db.query(sql);

    return {
        data
    }
}

async function getUserRatings(user_id) {
    var sql = "SELECT * FROM Ratings r JOIN Shops s ON s.shop_id = r.shop_id  WHERE user_id = " + user_id;
    const data = await db.query(sql);
    return {
        data
    }
}

module.exports = {
    getShops,
    getTowns,
    getShop,
}