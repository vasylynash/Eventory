const router = require('express').Router();
const authConfig = require('../../src/auth/authConfig');

router.post('/login', authConfig.authenticate('login', {
            successRedirect: '/',
            failureRedirect: '/login',
        })
);

router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

module.exports = router;