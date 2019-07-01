require('../model/login.js');
var mongoose = require('mongoose');
var loginmodel = mongoose.model('loginmodel');
exports.mainfn = function(req, res) {
    loginmodel.find({}, function(err, result) {
        res.render('view', {
            title: "loginform",
            result: result
        });
    });
};
exports.login = function(req, res) {
    var logindata = new loginmodel(req.body);
    logindata.save(function(err, res) {
        console.log(result);
    });
};