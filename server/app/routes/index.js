'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));
router.use('/recipes', require('./api/recipes'));
router.use('/users', require('./api/users'));
router.use('/search', require('./api/search'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
