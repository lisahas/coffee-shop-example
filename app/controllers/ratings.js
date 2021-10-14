const db = require('../services/db');
const Shop = require('../classes/Shop');

async function getUserRatings(user_id) {
    var sql = "SELECT * FROM ratings r JOIN shops s ON s.shop_id = r.shop_id  WHERE user_id = " + user_id;
    const data = await db.query(sql);
    var shops = [];
    for (var row of data ) {
        var shop  = new Shop.Shop(row.shop_id, row.shopname, row.shopaddress, row.shoptown);
        shop.user_rating = row.rating
        shops.push(shop);
    }
    return shops;

}

module.exports = {
    getUserRatings
}