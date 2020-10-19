const express = require('express');
const Database = require('../database/database');
const DateService = require('../services/date-service');
const router = express.Router();
const db = new Database();
router.get('/', function (req, res, next) {
    if (!req.session.user) {
        return res.redirect('/');
    }
    res.render('newcase', {
        title : 'PCMS',
        $user: req.session.user
    });
});

router.post('/', function (req, res, next) {
    const data = req.body;
    db.recordExists('cases', 'casenumber', data.casenumber, function (result) {
        if(result) {
            return res.send(`<script>
                        alert('A case with similar reference number already registered.')
                        window.location.href = '/newcase';
                </script> `);
        }
        const ds = new DateService();
        const sql = `
            INSERT INTO cases (casenumber,serial, description, level, date, route, officernumber)
            VALUES
            (
            '${data.casenumber}','${data.serial}','${data.description}','${data.level}','${ds.today}','${data.route}','${data.officernumber}'
            )
        `;
        db.execute(sql, function (result) {
            //res.send('The case has been recorded');
            return res.send(`<script>
                        alert('The case has been recorded');
                        window.location.href = '/cases';
                </script> `);
        });
    });
});
module.exports = router;
