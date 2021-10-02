// A class defining a coffee shop
class Shop {
    // Shop id
    id;
    // Shop name
    name;
    // Shop address
    address;
    // Shop town
    town;
    // Shop rating average
    rating;
    // Shop rating number of raters
    raters;


    constructor(id, name, address, town) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.town = town;
    }

    async getShopRatings() {
        const db = require('../services/db');
        // Get the total ratings
        var sql = "SELECT sum(rating) as total FROM ratings WHERE shop_id = " + this.id;
        var data = await db.query(sql);
        var total = data[0].total;
        // Get the number of users who rated
        var sql = "SELECT count(rating) as count FROM ratings WHERE shop_id = " + this.id;
        var data = await db.query(sql);
        var raters = data[0].count;
        this.raters = raters;
        // Calculate an average
        if(raters != 0) {
            this.rating = total / raters;
        }
        else {
            this.rating = 0;
        }
    }

}

module.exports = {
    Shop
  }