var config = require("../config/configurations");
var mongoose = require('mongoose');
var User = require('../datasets/user');
var UserHistory = require('../datasets/userHistory');
var underscore = require("underscore");


var userDataProcessor = function(req, SuccessCB, ErrorCB, notFoundCB) {
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) {
            console.log("Error Out when Sign In --> ", err);
            ErrorCB({ error: "Error Occured During Login" });
        };
        console.log("userDataProcessor----->", user);
        SuccessCB(user);
    });
};

var userProPicUpdate = function(req, SuccessCB, ErrorCB, notFoundCB) {
    User.findOneAndUpdate({ email: req.body.email }, { $set: { profilepic: req.body.newPicUrl } }, { safe: true, upsert: true, new: true }, function(err, user) {
        if (err) {
            console.log("Error Out when Sign In --> ", err);
            ErrorCB({ error: "Error Occured During Login" });
        };
        console.log("userHistoryUpdator----->", user);
        SuccessCB(user);
    });
};

var userHistoryUpdator = function(req, SuccessCB, ErrorCB, notFoundCB) {
    UserHistory.findOneAndUpdate({ email: req.body.email }, { $push: { reports: req.body.report } }, { safe: true, new: true }, function(err, user) {
        if (err) {
            console.log("Error Out when Sign In --> ", err);
            ErrorCB({ error: "Error Occured During Login" });
        };
        console.log("userHistoryUpdator----->", user);
        SuccessCB(user);
    });
};

var userHistoryCreator = function(req, SuccessCB, ErrorCB) {
    var newUserHistory = new UserHistory(req.body);
    newUserHistory.save(function(err, data) {
        if (err) {
            console.log("error was there in newUserHistoryCreation", err);
            ErrorCB(err);
        } else {
            console.log("data successfully saved", data);
            //SuccessCB({ "success": "created successfully" });
            SuccessCB(data);
        }
    });
};

var userHistoryProcessor = function(req, SuccessCB, ErrorCB, notFoundCB) {
    UserHistory.find({ email: req.body.email }, function(err, user) {
        if (err) {
            console.log("Error Out when Sign In --> ", err);
            ErrorCB({ error: "Error Occured During Login" });
        };
        console.log("userHistoryProcessor----->", user);
        SuccessCB(user);
    });
};

module.exports = {
    userDataProcessor: userDataProcessor,
    userHistoryUpdator: userHistoryUpdator,
    userHistoryProcessor: userHistoryProcessor,
    userProPicUpdate: userProPicUpdate,
    userHistoryCreator: userHistoryCreator
};
