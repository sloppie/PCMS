var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var page = req.session.user ? 'newcase': 'login';
  res.render(page, {
    title: 'PCMS',
    $user: req.session.user
  });
});
module.exports = router;
