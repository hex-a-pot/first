require('../model/signup.js');
var mongoose = require('mongoose');
var signupmodel = mongoose.model('signupmodel');
const bcrypt = require('bcrypt-nodejs');
var randomstring = require("randomstring");
var fs = require('fs');
var waterfall = require('async-waterfall');
var ejs = require('ejs');
var jwt = require('jsonwebtoken');
var communication = require('../communication');
var secret_key = 'SRCEukzwWJybZkUpHVdA5PtdkFvWPmddyUwtb2';
exports.signup = function(req, res) {
    var token = randomstring.generate({
        length: 150,
        charset: 'alphanumeric'
    });
    waterfall([
        function(callback) {
            req.body.token = token;
            req.body.tokenStatus = false;
            var signupdata = new signupmodel(req.body);
            signupdata.save(function(err, result) {
                callback(null, result);
            });
        }
    ], function(err, result) {
        var str = fs.readFileSync(process.cwd() + '/views/create_password.ejs', 'utf8');

        var emailJSON = {
            'name': req.body.name,
            'accessUrl': req.protocol + "://" + req.get('host') + '/create-user-password/' + token
        };
        htmlContent = ejs.render(str, emailJSON);
        var mailOptions = {
            recipient: result.mail,
            subject: 'Create Your Password',
            html: htmlContent
        };
        communication.sendEmail(mailOptions, function(err, result) {
            console.log("Line 47:", result);
        });
        res.status(200).json({ message: 'User registered successfully' })
    })
};

exports.createUserPassword = function(req, res) {
    signupmodel.findOne({ token: req.query.token }, { password: 0 }, function(err, result) {
        if (result == null) {
            res.status(498).json({ message: "Sorry! Token is expired or not valid" });
        } else if (result.tokenStatus == true || result.tokenStatus == null) {
            res.status(498).json({ message: "Sorry! Token is expired or not valid" });
        } else {
            res.status(200).json({ result: result });
        }
    });
}

exports.savePassword = function(req, res) {
    console.log("Hello");
    console.log(req.body);
    var hashnewPassword = bcrypt.hashSync(req.body.password);
    signupmodel.updateOne({ token: req.body.token }, {
        $set: {
            password: hashnewPassword,
            tokenStatus: true
        }
    }, function(err, result) {
        if (result.n == 1) {
            res.status(200).json({ message: "Password created successfully" });
        }
    });
}

exports.login = function(req, res) {
    signupmodel.findOne({ mail: req.body.mail }, function(err, result) {
        if (!err) {
            if (result.tokenStatus) {
                var checkPassword = bcrypt.compareSync(req.body.password, result.password);
                console.log(checkPassword);
                if (checkPassword) {
                    console.log("Line 22:", checkPassword);
                    var jwtObj = {
                        _id: result._id
                    };
                    var token = jwt.sign(jwtObj, secret_key, {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    res.status(200).json({ token: token });
                } else {
                    res.status(401).send({ message: 'The username and password you entered don\'t match!' });
                }
            } else {
                res.status(401).json({ message: 'Sorry, Server doesn\'t recognize that username!' });
            }
        } else {
            res.status(500).json({ message: 'Server problem, please try again' });
        }
    });
}
exports.mainfn = function(req, res) {
    signupmodel.find({}, function(err, result) {
        res.render('view', {
            title: "signupform",
            result: result
        });
    });
};
// exports.signup = function(req, res) {
//     var signupdata = new signupmodel(req.body);
//     signupdata.save(function(err, res) {
//         console.log(res);
//     });
// }