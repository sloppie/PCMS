const express = require('express');
const Database = require('../database/database');

const router = express.Router();
const db =new Database();

router.get('/', function (req, res, next) {
    if (!req.session.user || !req.session.user.admin) {
        return res.redirect('/');
    }
    const user =req.query.user;
    db.execute(`update  users set admin = 1 where  officernumber = '${user}'`, function (result) {
        return res.redirect('/users');
    });
});

module.exports = router;
