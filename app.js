// let http = require('http');


// http.createServer(function (req, res) {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.end("First node js server!");
// }).listen(7890);


// const express = require('express');
// const app = express();

// app.get('/', function (req, res) {
//     res.send("I'm here!");
// })

// app.get('/:url', function (req, res) {
//     let shortUrl = req.params.url;
//     res.send("The short url is: " + shortUrl);
// })

// app.listen(7890, function (req, res) {
//     console.log("Server is running....");
// });

const os = require('os');
console.log(os.version());