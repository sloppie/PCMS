const express = require('express');

const router = express.Router();

router.get('/', function (req, res, next) {
   if (req.session.user) {
       req.session.destroy(error =>{
           if ( error) {
               throw error;
           }
        })
   }
   return res.redirect('/');
});

module.exports = router;
