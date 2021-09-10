// Import express.js
const express = require("express");

// Create express app
var app = express();

// Add static files location
app.use(express.static("static"));

// Get the functions required for shops
const shops = require('./controllers/shops.js');
// Get the functions required for ratings
const ratings = require('./controllers/ratings.js');

// Route for the coffee shop list
// Optional paramter for town
app.get("/shops/:town?", async function (req, res) {
    console.log(req.params);
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
        next(err);
    }
});

// A route to display info on a single shop
app.get("/shop/:shop", async function (req, res) {
    try {
      res.json(await shops.getShop(req.params.shop));
    } catch (err) {
        console.error(`Error while getting shop `, err.message);
        next(err);
    }
});

// A route to display a users rated shops
app.get("/ratings/:user_id", async function (req, res) {
    try {
      res.json(await ratings.getUserRatings(req.params.user_id));
    } catch (err) {
        console.error(`Error while getting user ratings `, err.message);
    }
});

// Create a route for /goodbye
// Responds to a 'GET' request
app.get("/goodbye", function (req, res) {
    res.send("Goodbye world!");
});

// Create a dynamic route for /hello/<name>, where name is any value provided by user
// At the end of the URL
// Responds to a 'GET' request
app.get("/hello/:name", function (req, res) {
    // req.params contains any parameters in the request
    // We can examine it in the console for debugging purposes
    console.log(req.params);
    //  Retrieve the 'name' parameter and use it in a dynamically generated page
    res.send("Hello " + req.params.name);
});


// Start server on port 3000
app.listen(3000, function () {
    console.log(`Server running at http://127.0.0.1:3000/`);
});