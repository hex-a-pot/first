var mongoose = require("mongoose");
var schema = mongoose.Schema;
var loginSchema = new schema({
    Email: { type: String, require: true },
    password: { type: String, require: true },

});

exports.loginmodel = mongoose.model('loginmodel', loginSchema);