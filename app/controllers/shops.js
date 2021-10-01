const db = require('../services/db');
const Shop = require('../classes/Shop');

async function getShops(filter) {
    var sql = 'SELECT * FROM Shops';
    if (filter != 'all') {
        sql += ` WHERE shoptown = "${filter}"`;
    }
    let data = await db.query(sql);
    var shops = [];
    for (var row of data ) {
        var shop  = new Shop.Shop(row.shop_id, row.shopname, row.shopaddress, row.shoptown);
        await shop.getShopRatings();
        shops.push(shop);
    }
    // Return an array of Shop instances
    return shops;
}

async function getTowns() {
    var sql = "SELECT DISTINCT shoptown FROM Shops";
    let data = await db.query(sql);
    towns = [];
    for (var row of data ) {
        towns.push(row.shoptown);
    }
    // Return an array of town names
    return towns;
}

async function getShop(id) {
    //TODO get the ratings and calcuate their average (and maybe number of raters)
    var sql = "SELECT * FROM Shops WHERE shop_id = " + id;
    const data = await db.query(sql);
    for (var row of data) {
        var shop  = new Shop.Shop(row.shop_id, row.shopname, row.shopaddress, row.shoptown);
        await shop.getShopRatings();
    }
    return shop;
}


module.exports = {
    getShops,
    getTowns,
    getShop,
}