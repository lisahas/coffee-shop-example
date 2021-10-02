const db = require('../services/db');
const Shop = require('../classes/Shop');

async function getShops(filter) {
    var sql = 'SELECT * FROM shops';
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
    var sql = "SELECT DISTINCT shoptown FROM shops";
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
    var sql = "SELECT * FROM shops WHERE shop_id = " + id;
    const data = await db.query(sql);
    for (var row of data) {
        var shop  = new Shop.Shop(row.shop_id, row.shopname, row.shopaddress, row.shoptown);
        await shop.getShopRatings();
    }
    return shop;
}

async function addShop(shopData) {
    var sql = `INSERT INTO shops (shopname, shopaddress, shoptown) 
    VALUES ('${shopData.shopName}', '${shopData.shopAddress}', '${shopData.shopTown}')`;
    result = await db.query(sql);
    return result;
}

async function addRating(newId, userId, rating) {
    var sql = `INSERT INTO ratings (user_id, shop_id, rating) 
    VALUES ('${userId}', '${newId}', '${rating}')`;
    result = await db.query(sql);
    return result;
} 

module.exports = {
    getShops,
    getTowns,
    getShop,
    addShop,
    addRating
}