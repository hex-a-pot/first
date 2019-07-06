// var request = require('request');
var nodemailer = require('nodemailer');
var smtpTransport = require("nodemailer-smtp-transport");

var transporter = nodemailer.createTransport(smtpTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'resumebuilder802@gmail.com',
        pass: 'kolkata@007'   
     }
}));

module.exports = {
    sendEmail: function(data, callback) {
        var mailOptions = {
            from: 'Hex-a-pot' + '<resumebuilder802@gmail.com>',
            to: data.recipient,
            subject: data.subject,
            html: data.html
        };
        transporter.sendMail(mailOptions, function(error, info) {
            callback(error, info);
        });
    },
    sendSMS: function(data, callback) {

        /* Plivo Section Start */

        // client.messages.create(
        //     'DGXSMS',
        //     '+91' + data.mobile,
        //     data.message
        // ).then(function(error, response) {
        //     callback(error, response);
        // });

        /* Plivo Section End */

        /* MSG91 Section Start  */

        /* Transactional Route*/

        var headers = {
            "authkey": "205301AMc9JsqlK5ab3bac0",
            "content-type": "application/json"
        };

        var mobileNo;

        var checkMobileArray = Array.isArray(data);
        if (!checkMobileArray) {
            mobileNo = [data.mobile];
        } else {
            mobileNo = data.mobile;
        }
        var params = {
            "sender": "PRVNCE",
            "route": "4",
            "country": "91",
            "sms": [{
                "message": data.message,
                "to": mobileNo
            }]
        };

        request({
            url: "http://api.msg91.com/api/v2/sendsms",
            method: 'POST',
            json: params,
            headers: headers
        }, function(error, response, body) {
            callback(error, body);
        });

        /* OTP Route */

        // request({
        //     url: 'https://control.msg91.com/api/sendotp.php?authkey=195515AdZo4bbTdzLO5a6e0464&mobile=' + data.mobile + '&message=' + data.message + '&sender=DGXSMS&otp=' + data.mobileCode,
        //     method: 'get',
        // }, function(error, response, body) {
        //     console.log(body);
        //     callback(error, body);
        // });
        /* MSG91 Section End  */

    },
    verifyCaptcha: function(recaptchaResponse, callback) {
        var params = {
            "secret": "6LchQUQUAAAAAEEjWO7F0K23Lbu2-id3vvplcyJq",
            "response": recaptchaResponse,
        };

        request({
            url: "https://www.google.com/recaptcha/api/siteverify",
            method: 'POST',
            form: params,
        }, function(error, response, body) {
            callback(error, body);
        });
    }
};