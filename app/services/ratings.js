const db = require('./db');

async function getUserRatings(user_id) {
    var sql = "SELECT * FROM Ratings r JOIN Shops s ON s.shop_id = r.shop_id  WHERE user_id = " + user_id;
    const data = await db.query(sql);
    return {
        data
    }
}

module.exports = {
    getUserRatings
}