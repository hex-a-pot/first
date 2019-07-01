var express = require("express"),
    http = require("http"),
    path = require("path"),
    cors = require("cors");
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var app = express();
var server = http.createServer(app);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
require('./routes/routes.js')(app);
require('./database/db.js');
app.route('/*').get(function(req, res) {
    res.sendFile(path.resolve('./public/index.html'))
})
server.listen(3001, function() {
    console.log("server is running")
});