const express = require('express');
const Database = require('../database/database');

const router = express.Router();
const db =new Database();

router.get('/', function (req, res, next) {
    if (!req.session.user || !req.session.user.admin) {
        return res.redirect('/');
    }
    db.execute('select vehicles.sacconame as sacco, count(cases.casenumber) as cases from vehicles inner join cases on vehicles.serial = cases.serial group by vehicles.sacconame', function (result) {
        console.log(result);
        res.render('reports', {
            cases : result,
            $user: req.session.user
        });
    });
});

router.post('/', function (req, res, next) {
    console.log(req.body);
    var sql =''
    if (req.body.data == 'cases') {
         sql = 'select vehicles.sacconame as sacco, count(cases.casenumber) as cases from vehicles inner join cases on vehicles.serial = cases.serial group by vehicles.sacconame';
    }else {

    }

    if (!req.session.user || !req.session.user.admin) {
        return res.redirect('/');
    }
    db.execute(sql, function (result) {
        return res.send(result)
    });

});

module.exports = router;
