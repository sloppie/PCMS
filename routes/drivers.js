const express = require('express');
const Database = require('../database/database');

const router = express.Router();
const db =new Database();

router.get('/', function (req, res, next) {
    if (!req.session.user) {
        return res.redirect('/');
    }
    db.execute('select * from drivers', function (result) {
        res.render('drivers', {
            drivers : result,
            $user: req.session.user
        });
    });
});
module.exports = router;
