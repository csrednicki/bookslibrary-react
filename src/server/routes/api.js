let express = require('express');
let router = express.Router();
let os = require('os');

router.get('/', function (req, res, next) {
    res.send('api');
});

router.get('/getUsername', function (req, res, next) {
    res.send({
        username: os.userInfo().username
    });
});

module.exports = router;