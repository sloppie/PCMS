const express = require('express');
const Database = require('../database/database');

const router = express.Router();
const db =new Database();

router.get('/', function (req, res, next) {
    if (!req.session.user) {
        return res.redirect('/');
    }
    let sql = req.session.user.admin ? 'select * from notifications' : 'select * from notifications where approved = true';
    db.execute(sql, function (result) {
        res.render('notifications', {
            notifications : result,
            $user: req.session.user
        });
    });
});

module.exports = router;
