// Import express.js
const express = require("express");

// Create express app
var app = express();

// Body parser modules for POST requests
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

// Add static files location
app.use(express.static("static"));

// Use pug
app.set('view engine', 'pug');
// Set the path to the pug templates
app.set('views', '/src/views');


// Get the functions required for shops
const shops = require('./controllers/shops.js');
// Get the functions required for ratings
const ratings = require('./controllers/ratings.js');

// Test the pug template
app.get('/', async function (req, res) {
    res.render('index')
});


// Coffee shop listing page, rendered via PUG
// As a coffee drinker I want to be able to list reviewed coffee shops in my town so that I can drink good coffee
app.get('/listing', async function (req, res) {
    // find out if there is a parameter passed
    console.log(req.query.town);
    var filter = 'all';
    if(req.query.town) {
        filter = req.query.town;
    }
    try {
        var shopslist = await shops.getShops(filter);
        var townslist = await shops.getTowns();
        res.render('listing', {'shops' : shopslist, 'towns' : townslist, 'selected' : filter });
      } catch (err) {
          console.error(`Error while getting shops `, err.message);
      }
});

// Route for the coffee shop list JSON
// Optional paramter for town
// As a coffee drinker I want to be able to list reviewed coffee shops in my town so that I can drink good coffee
app.get("/shops/:town?", async function (req, res) {
    if (!req.params.town) {
        filter = 'all';
    }
    else {
        filter = req.params.town;
    }
    try {
      res.json(await shops.getShops(filter));
    } catch (err) {
        console.error(`Error while getting shops `, err.message);
    }
});

// A route for generating the drop down list of possible towns
app.get("/town-options", async function (req, res) {

    // Now get the towns for creating an option list
    try {
      res.json(await shops.getTowns());
    } catch (err) {
        console.error(`Error while getting towns `, err.message);
    }
});

// A route to display info on a single shop JSON
app.get("/shop/:shop", async function (req, res) {
    try {
      res.json(await shops.getShop(req.params.shop));
    } catch (err) {
        console.error(`Error while getting shop `, err.message);
        next(err);
    }
});

// A route to display info on a single shop with PUG
app.get("/single-shop/:id", async function (req, res) {
    try {
       shopData = await shops.getShop(req.params.id);
       console.log(shopData);
       res.render('shop', {'shop' : shopData});
    } catch (err) {
        console.error(`Error while getting shop `, err.message);
    }
});

// A route to display a users rated shops JSON
// As a coffee drinker I want to list the coffee shops that I have rated in the past so I can visit the coffee shops again
app.get("/ratings/:user_id", async function (req, res) {
    try {
      res.json(await ratings.getUserRatings(req.params.user_id));
    } catch (err) {
        console.error(`Error while getting user ratings `, err.message);
    }
});

// As a coffee drinker, I want to add a coffee shop
app.post('/add-shop', async function (req, res) {
    try {
        var result = await shops.addShop(req.body);
        var newId = result.insertId;
        var ratingResult = await shops.addRating(newId, req.body.userId, req.body.shopRating);
     } catch (err) {
         console.error(`Error while adding shop or rating `, err.message);
     }
     res.redirect('/listing');
});

// Start server on port 3000
app.listen(3000, function () {
    console.log(`Server running at http://127.0.0.1:3000/`);
});