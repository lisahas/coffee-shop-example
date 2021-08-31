// Import express.js
const express = require("express");

// Create express app
var app = express();

// Add static files location
app.use(express.static("static"));

// Get the functions required for shops
const shops = require('./services/shops.js');
// Route for the coffee shop list
// Optional paramter for town
app.get("/:town?", async function (req, res) {
    var output = '';
    if (!req.params.town) {
        filter = 'all';

    }
    else {
        filter = req.params.town;
    }
    try {
      console.log(shops.getShops(filter));
     // output += (await shops.getShops(filter));
    } catch (err) {
        console.error(`Error while getting shops `, err.message);
        next(err);
    }

    // Now get the towns for creating an option list
    try {
        var townslist = await shops.getTowns();
        output += townslist['ret'];
    } catch (err) {
        console.error(`Error while getting shops `, err.message);
        next(err);
    }
    res.send(output);
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