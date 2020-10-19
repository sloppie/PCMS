var express = require('express');
var Database = require('../database/database');
var router = express.Router();
var db = new Database();
/* GET Login page. */
router.get('/', function(req, res, next) {
    return res.render('login', { title: 'PSV Crime Management System' });
});

/*Post Login Data */
router.post('/', function (req, res, next) {
    var data = req.body;
    db.execute(`SELECT * FROM users WHERE officernumber = '${data.officernumber}' AND  password = '${data.password}'`, function (result) {
        if(result.length == 0) {
            return  res.render('login', {error : 'Incorrect officer number or password.'})
        }
        //res.send(result);
        req.session.user = result[0];
        return res.redirect('/');
    });
});

module.exports = router;
