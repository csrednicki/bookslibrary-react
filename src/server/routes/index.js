let express = require('express');
let router = express.Router();
let os = require('os');
let routesObj = router.stack;

router.get('/', function (req, res, next) {
    res.send(`Welcome! Current date is ${ Date(Date.now()).toString() }`);
});

module.exports = router;