const express = require('express');
const Database = require('../database/database');

const router = express.Router();
const db =new Database();

router.get('/', function (req, res, next) {
  if (!req.session.user || !req.session.user.admin) {
    return res.redirect('/');
  }
  db.execute('select * from users', function (result) {
    res.render('users', {
      users : result,
      $user: req.session.user
    });
  });
});

module.exports = router;
