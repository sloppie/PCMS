const express = require('express');
const Database = require('../database/database');
var router = express.Router();
var db = new Database();
router.get('/', function (req, res, next) {
    if (!req.session.user) {
        return res.redirect('/');
    }
    res.render('newdriver', {title : 'PCMS', $user: req.session.user});
});

router.post('/', function (req, res, next) {
    var data = req.body;

    db.recordExists('drivers', 'nationalid', data.nationalid, function(result){
       if(result) {
           res.send('The national id is already registered to another driver.');
           return;
       }
       db.recordExists('drivers', 'email', data.email, function (result) {
           if(result) {
               res.send('The email address is already registered to another driver.');
               return;
           }
           db.recordExists('drivers', 'phonenumber', data.phonenumber, function (result) {
               if(result) {
                   res.send('The phone number is already registered to another driver.');
                   return;
               }
               var sql = `
                INSERT INTO drivers (nationalid, firstname, lastname,email, phonenumber)
                VALUES (
                    '${data.nationalid}', '${data.firstname}', '${data.lastname}', '${data.email}', '${data.phonenumber}'
                )
             `;
               db.execute(sql, function (result) {
                res.send('Driver registered successfuly.');
               });
           });
       });
    });
});
module.exports = router;
