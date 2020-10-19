var express = require('express');

var router = express.Router();
const Database = require('../database/database');
var db = new Database();

router.get('/', function(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/');
    }
    db.execute('select * from drivers', function (result) {
        res.render('addvehicle',
            {
                title: 'PSV Crime Management System',
                drivers : result,
                $user: req.session.user
            }
        );
    });
});

router.post('/', function (req, res, next) {
    const data = req.body;
    db.recordExists('vehicles', 'serial', data.serial, function (result) {
        if(result){
            res.send('The car serial is already used.');
            return;
        }
        var sql = `
            INSERT INTO vehicles(serial, color, seatertype, sacconame)
            VALUES 
            ('${data.serial}', '${data.color}', '${data.seatertype}','${data.sacconame}')
        `;
        db.execute(sql, function (result) {
           res.send('Vehicle registered.');
        });
    });
});
module.exports = router;
