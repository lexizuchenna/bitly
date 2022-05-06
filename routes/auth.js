const express = require('express')
const passport = require('passport')
const router = express.Router()

router.get('/google', passport.authenticate('google', {scope: ['profile']}))

router.get('/google/callback', passport.authenticate('google', {
    faliureRedirect: '/users/login'
}), (req, res) =>{
    res.redirect('/users/dashboard')
})

module.exports = router