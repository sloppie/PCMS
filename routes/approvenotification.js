const express = require('express');
const router = express.Router();
const Database = require('../database/database');

const db = new Database();
router.get('/', function(req, res, next) {
    if (!req.session.user || !req.session.user.admin) {
        return res.redirect('/');
    }
   const id = parseInt(req.query.id);
   db.execute('update notifications set approved = true where id = '+id, function (result) {
       return res.redirect('/notifications');
   })
});
module.exports = router;
