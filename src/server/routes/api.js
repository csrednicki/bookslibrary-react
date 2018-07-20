let express = require('express');
let router = express.Router();
let os = require('os');
let routesObj = router.stack;

router.get('/getUsername', function (req, res, next) {
    res.send({
        username: os.userInfo().username
    });
});

router.get('/', function (req, res, next) {
    res.send(`Welcome to API!`);
});

module.exports = router;