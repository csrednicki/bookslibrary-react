let express = require('express');
let router = express.Router();
let utils = require('../utils');
let routesObj = router.stack;

const dbfile = 'books.json';

router.get('/getBooks', function (req, res, next) {
    utils.getData(dbfile, 'utf8')
        .then(data => {
            // sending json to client
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        })
        .catch(error => {
            console.log('Error: ', error)
        });
});

router.put('/saveBooks', function (req, res, next) {
    let data = req.body;

    if(data.length > 0 ) {

        let booksData = JSON.stringify(req.body);

        // saving books file
        utils.saveData(dbfile, booksData)
            .then(data => {
                res.status(200).send('List saved')
            } )
            .catch(error => console.log('Error: ', error) );
    } else {
        res.status(200).send('List empty')
    }
});

module.exports = router;