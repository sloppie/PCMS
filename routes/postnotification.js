const express = require('express');
const Database = require('../database/database');
const DateService = require('../services/date-service');

const router = express.Router();
const db = new Database();
router.get('/', function (req, res, next) {
    if (!req.session.user) {
        return res.redirect('/');
    }
    res.render('postnotification', {
        title : 'PCMS',
        $user: req.session.user
    });
});

router.post('/', function (req, res, next) {
    const data = req.body;
    const ds = new DateService();
    const sql = `
        INSERT INTO notifications (officernumber,message, date, route)
        VALUES 
        (
            '${data.officernumber}','${data.message}','${ds.today}','${data.route}'
        )
    `;
    db.execute(sql, function (result) {
        return res.send(`<script>
            alert('Notification posted. Pending admin approval.')
            window.location.href = '/notifications';
        </script>  `);

    });
});
module.exports = router;
