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
    // Shop rating
    rating;


    constructor(id, name, address, town) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.town = town;
    }

    getShopRatings() {
        // Placeholder for now
        this.rating = 5;
    }

}

module.exports = {
    Shop
  }