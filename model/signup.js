var mongoose = require("mongoose");
var schema = mongoose.Schema;
var signupSchema = new schema({
    name: { type: String, require: true },
    mail: { type: String, require: true },
    cont: { type: String, require: true },
    password: { type: String },
    token: { type: String },
    tokenStatus: { type: Boolean },
    created_at: { type: Date, default: Date.now }

});

exports.signupmodel = mongoose.model('signupmodel', signupSchema);