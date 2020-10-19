const express = require('express');
const Database = require('../database/database');

var router = express.Router();
var db =new Database();

router.get('/', function (req, res, next) {
    if (!req.session.user) {
        return res.redirect('/');
    }
    db.execute('select * from cases', function (result) {
        res.render('cases', {
            cases : result,
            $user: req.session.user
        });
    });
});

module.exports = router;
