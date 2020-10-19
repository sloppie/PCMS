const express = require('express');
const Database = require('../database/database');
const PasswordService = require('../services/password-service');
const router = express.Router();
const db = new Database();

/* GET Register page. */
router.get('/', function(req, res, next) {
    if (!req.session.user || !req.session.user.admin) {
        return res.redirect('/');
    }
    res.render('register', {
        title: 'PSV Crime Management System',
        $user: req.session.user
    });
});

/*Post Registration  Data */
router.post('/', function (req, res, next) {
    const data = req.body;
    db.recordExists('users', 'officernumber', data.officernumber, function (result) {
        if(result) {
            return res.send(`<script>
                        alert('Officer number already taken.')
                        window.location.href = '/register';
                </script>  `);
        }
        db.recordExists('users', 'email', data.email, function (result) {
            if(result) {
                return res.send(`<script>
                        alert('Email already used.')
                        window.location.href = '/register';
                </script>  `);
            }
            db.recordExists('users', 'phonenumber', data.phonenumber, function (result) {
                if(result) {
                    return res.send(`<script>
                        alert('Phone number already used.')
                        window.location.href = '/register';
                </script> `);
                }
                const ps = new PasswordService();
                const pass = ps.randomPassword;
                const sql = `INSERT INTO users (
                officernumber ,
                firstname, 
                lastname,
                nationalid,
                email, 
                phonenumber,
                password
                ) 
             VALUES  
            (
                '${data.officernumber}',
                '${data.firstname}',
                '${data.lastname}',
                '${data.nationalid}',
                '${data.email}',
                '${data.phonenumber}',
                '${pass}'
            )
            `;
                db.execute(sql, function (result) {
                    return res.send(`<script>
                        alert('Officer registered. The officer can use the password "'+pass+'" to login.');
                        window.location.href = '/users';
                </script>  `);
                });
            });
        });
    });

});
module.exports = router;
