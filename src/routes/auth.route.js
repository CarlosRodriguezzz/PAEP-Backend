const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google/login', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/failed'
  }),
  function (req, res) {
    console.log(req.query.code);
    console.log('Logged in successfully!');
    res.redirect('/profile');
  }
);

router.get('/verifyLogin', (req, res) => {
  if(req.user) {
    res.status(200).send('Logged in');
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;