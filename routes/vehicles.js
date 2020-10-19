const express = require('express');
const Database = require('../database/database');

const router = express.Router();
const db =new Database();

router.get('/', function (req, res, next) {
    if (!req.session.user) {
        return res.redirect('/');
    }
    db.execute('select * from vehicles', function (result) {
        res.render('vehicles', {
            vehicles : result,
            $user: req.session.user
        });
    });
});

module.exports = router;
