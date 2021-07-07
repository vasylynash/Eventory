const router = require('express').Router();
const Event = require('../models/Event');
const withAuth = require('../utils/auth');

router.get('/', async function(req, res) {
    
    const eventData = await Event.findAll();
        
        const events = eventData.map(el => el.get({plain: true}));
        res.json(events);
})

router.get('/login', function(req, res) {
    if(req.user) {
        res.redirect('/');
    } else {
        res.send(
            '<form action="/api/users/login" method="POST">'
            + '<h2>Login</h2>'
            + '<p><input name="email"></p>'
            + '<p><input name="password"></p>'
            + '<p><input type="submit" value="Login"></p>'
            + '<p style="color: red;">' + "LOGINERROR" + '</p>'
            + '</form>'
        );
    }
});

router.get('/myevents', withAuth, async function(req, res) {
    
    const eventData = await Event.findAll(
        {
            where: {
                owner_id: req.user.id
            }
        });
        
        const events = eventData.map(el => el.get({plain: true}));
        res.json(events);
})

module.exports = router;