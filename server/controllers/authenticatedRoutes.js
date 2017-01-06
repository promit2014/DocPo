var router = require("express").Router();
var userdataprocessor = require("../processors/userDataProcessor");

var autheticatedrouter = function(passport) {
    router.get('/authenticated', passport.authenticate('jwt', { session: false }), function(req, res) {
        res.json({ msg: "access granted" });
    });

    router.post('/userData', passport.authenticate('jwt', { session: false }), function(req, res) {
        console.log("request from userData", req.body);
        userdataprocessor.userDataProcessor(req, function(data) {
            console.log("Successfully found User");
            res.status(200).json(data);
        }, function(err) {
            console.log("Error Out", err);
            res.status(500).json({ error: "Error Occured" });
        }, function(notFound) {
            console.log("No User Exist");
            res.status(401).json(notFound);
        });
    });

    router.post('/updateProPic', passport.authenticate('jwt', { session: false }), function(req, res) {
        console.log("request from userData", req.body);
        userdataprocessor.userProPicUpdate(req, function(data) {
            console.log("Successfully found User");
            res.status(200).json(data);
        }, function(err) {
            console.log("Error Out", err);
            res.status(500).json({ error: "Error Occured" });
        }, function(notFound) {
            console.log("No User Exist");
            res.status(401).json(notFound);
        });
    });

    router.post('/newReport', passport.authenticate('jwt', { session: false }), function(req, res) {
        console.log("request from newReport", req.body);
        userdataprocessor.userHistoryCreator(req, function(data) {
            console.log("Successfully found User");
            res.status(201).json(data);
        }, function(err) {
            console.log("Error Out", err);
            res.status(500).json({ error: err });
        });
    });

    router.post('/newSubReport', passport.authenticate('jwt', { session: false }), function(req, res) {
        console.log("request from newSubReport", req.body);
        userdataprocessor.userHistoryUpdator(req, function(data) {
            console.log("Successfully found User");
            res.status(200).json(data);
        }, function(err) {
            console.log("Error Out", err);
            res.status(500).json({ error: "Error Occured" });
        }, function(notFound) {
            console.log("No User Exist");
            res.status(401).json(notFound);
        });
    });

    router.post('/reports', passport.authenticate('jwt', { session: false }), function(req, res) {
        console.log("request from Report", req.body);
        userdataprocessor.userHistoryProcessor(req, function(data) {
            console.log("Successfully found User");
            res.status(200).json(data);
        }, function(err) {
            console.log("Error Out", err);
            res.status(500).json({ error: "Error Occured" });
        }, function(notFound) {
            console.log("No User Exist");
            res.status(401).json(notFound);
        });
    });


    return router;
}

module.exports = autheticatedrouter;
