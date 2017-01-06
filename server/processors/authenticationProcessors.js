var passport = require("passport");
var jwt = require("jsonwebtoken");
var config = require("../config/configurations");
var mongoose = require('mongoose');
var User = require('../datasets/user');
var UserHistory = require('../datasets/userHistory');
var mailProcessor = require('./mailProcessor');
var async = require('async');
var email_templates = require('./emailTemplate');

var passportinit = passport.initialize();

var signupProcessor = function(req, SuccessCB, ErrorCB) {

    var newUser = new User({
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        dob: req.body.dob,
        age: req.body.age,
        gender: req.body.gender,
        mobile: req.body.mobile,
        city: req.body.city,
        country: req.body.country,
        password: req.body.password
    });

    var newUserHistory = new UserHistory({
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        dob: req.body.dob,
        age: req.body.age,
        gender: req.body.gender,
        mobile: req.body.mobile,
        city: req.body.city,
        country: req.body.country,
        symptoms: 'Pain in Back',
        briefDesc: 'Muscle Pain , Not fracture seen',
        longDesc: 'Who classification as normal , Fracture risk is minimal and has absolute no chanceof increasing.',
        prescribedDoctor: 'John Doe',
        prescribedDoctorAddress: 'Jetalpur Road , Baroda',
        prescribedDoctorContact: '9087123433',
        reports: [{
            reportof: 'X-Ray',
            symptoms: 'Pain in Back',
            briefDesc: 'Muscle Pain , Not fracture seen',
            longDesc: 'Who classification as normal , Fracture risk is minimal and has absolute no chanceof increasing.',
            conclusion: 'Normal delivery required. Nothing abnormal',
            findings: 'WHO classification : Normal , Fracture Risk : Not Increased',
            reportImages: [{
                imageTitle: 'X-Ray for Spine',
                imageDescription: 'x-Lumber Spine X-Ray Scan.',
                imageUrl: "http://www.avoidboneloss.com/hologic2.jpg"
            }],
            prescribedDoctor: 'Dr Batra',
            prescribedDoctorAddress: 'Baroda',
            prescribedDoctorContact: '9038127638',
            uploadedBy: 'HOLOGIC Imaging',
            uploaderAddress: 'FatehGunj , Baroda',
            uploaderContact: '9038173053'
        }, {
            reportof: 'Blood Test',
            symptoms: 'Weakness',
            briefDesc: 'Low in Healoglobin',
            longDesc: 'Low in Heamoglobin , Nothing Serious',
            conclusion: 'High Cholestrol',
            findings: 'High Cholestrol Seen in Blood',
            reportImages: [{
                imageTitle: 'Blood Test for Cholestrol',
                imageDescription: 'High Blood Cholestrol level',
                imageUrl: "http://ozonehospital.com/wp-content/uploads/2015/06/Testimony20.jpg"
            }],
            prescribedDoctor: 'Dr Batra',
            prescribedDoctorAddress: 'Baroda',
            prescribedDoctorContact: '9038127638',
            uploadedBy: 'HOLOGIC Imaging',
            uploaderAddress: 'FatehGunj , Baroda',
            uploaderContact: '9038173053'
        }]
    });

    async.series({
        one: function(callback) {
            newUser.save(function(err, data) {
                if (err) {
                    console.log("error was there in newUser Creation", err);
                    callback(err, null);
                } else {
                    console.log("data successfully saved", data);
                    //SuccessCB({ "success": "created successfully" });
                    callback(null, data);
                }
            });
        },
        two: function(callback) {
            newUserHistory.save(function(err, data) {
                if (err) {
                    console.log("error was there in newUserHistoryCreation", err);
                    callback(err, null);
                } else {
                    console.log("data successfully saved", data);
                    //SuccessCB({ "success": "created successfully" });
                    callback(null, data);
                }
            });
        }
    }, function(err, results) {
        // results is now equal to: {one: 1, two: 2}
        if (err) {
            ErrorCB(err);
        } else {
            var confirmationToken = jwt.sign({ user: req.body.email }, config.secret, {
                expiresIn: 10080 //seconds
            });
            /*mailProcessor.sendNotification('DocPo Activation link', 'Welcome to Docpo. '+
                'Please visit the following link http://localhost/activation/' + confirmationToken,req.body.email,'DocPo Admin <noreply@docpo.com>');
                mailProcessor.sendNotification('DocPo Activation link', email_templates.activation_template(req.body.firstname , req.body.lastname , confirmationToken),req.body.email,'DocPo Admin <noreply@docpo.com>');
            console.log(email_templates.activation_template(req.body.firstname , req.body.lastname , confirmationToken));
            */SuccessCB({ "success": "created successfully" });
        }
    });

};

var loginProcessor = function(req, SuccessCB, ErrorCB, notFoundCB) {
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) {
            console.log("Error Out when Sign In --> ", err);
            ErrorCB({ error: "Error Occured During Login" });
        };

        console.log("data----->", user);

        if (!user) {
            notFoundCB({ error: "User Not Found" });
        } else {
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (isMatch && !err) {
                    var authToken = jwt.sign({ user: user.email }, config.secret, {
                        expiresIn: 10080 //seconds
                    });
                    SuccessCB({ email: user.email, firstname: user.firstname, lastname: user.lastname, dob: user.dob, age: user.age, gender: user.gender, mobile: user.mobile, city: user.city, country: user.country, profilepic: user.profilepic, authToken: 'JWT ' + authToken });
                } else {
                    notFoundCB({ error: "Password Doesnot match" });
                }
            });
        };
    });
}

module.exports = {
    signupProcessor: signupProcessor,
    loginProcessor: loginProcessor
}
