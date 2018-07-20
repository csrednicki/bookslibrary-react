let express = require('express');
let router = express.Router();
let utils = require('../utils');

let routesObj = router.stack;

router.get('/getBooks', function (req, res, next) {
    utils.getData('books.json', 'utf8')
        .then(data => {
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        })
        .catch(
            error => {
                console.log('Error: ', error);
            }
        );
});

router.put('/saveBooks', function (req, res, next) {
    console.log('body:', req.body)

    let datatosave = JSON.stringify(req.body);
    console.log(datatosave)

    utils.saveData('books.json', datatosave)
        .then(data => {
            res.status(200).send('List saved');
        })
        .catch(
            error => {
                console.log('Error: ', error);
            }
        );
});

router.get('/', function (req, res, next) {
    res.send(`Welcome to Books Directory!`);
});

module.exports = router;