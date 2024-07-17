const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");

app.use(bodyParser.urlencoded({ extended: true }));
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const userInput = req.body.bitcoinValue;
    console.log(userInput);
    request(`https://api.coingecko.com/api/v3/simple/price?ids=${userInput}&vs_currencies=usd`, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            const price = data[userInput]?.usd;
            if (price) {
                res.send(`<h1>The current price of ${userInput} is $${price} USD.</h1>`);
            } else {
                res.send(`<h1>Invalid cryptocurrency: ${userInput}</h1>`);
            }
        } else {
            res.send(`<h1>Error fetching data. Please try again later.</h1>`);
        }
    });
});

app.listen(3000, function () {
    console.log("server has started at port 3000");
});
