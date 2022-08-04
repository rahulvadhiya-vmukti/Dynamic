const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../build/auth');

// Welcome Page
router.get('/adminlogin', forwardAuthenticated, (req, res) => res.render('welcome'));

// // Dashboard
// router.get('/dashboard', ensureAuthenticated, (req, res) =>
//   res.render('dashboard', {
//     user: req.user
//   })
// );
router.use('/admin', require('./admin.js'));

module.exports = router;