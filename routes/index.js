const express = require('express')
const router = express.Router()
const {ensureAuthenticated, ensureNotAuthenticated, ensureAuth} = require('../auth/auth')
const User = require('../models/Users')

router.get('/', ensureNotAuthenticated, (req, res) =>{
    res.render('index')
})

router.get('/about', (req, res) =>{
    res.render('about')
})


module.exports = router;