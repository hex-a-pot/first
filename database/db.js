var mongoose = require("mongoose");
var dbase = mongoose.connect('mongodb://localhost:27017/logindb', { useNewUrlParser: true });


mongoose.connection.on("connected", function() {
    console.log("Database switched ON");
});

mongoose.connection.on("error", function() {
    console.log("Database switched OFF");
});