'use strict';

var express = require('express');
var https = require('https');
var router = express.Router();

var accessKey = '3e6b2ac061d54d5a84581e69e5b53bd8';
var results = null;

let uri = 'eastus.api.cognitive.microsoft.com';
let path = '/text/analytics/v2.0/';

let response_handler = function (response) {
    let body = '';

    let return_mes;
    let return_err;
    response.on ('data', function (d) {
        body += d;
    });
    response.on ('end', function () {
        let body_ = JSON.parse (body);
        let body__ = JSON.stringify (body_, null, '  ');
        results = body__;
    });
    response.on ('error', function (e) {
        return_err = 'Error: ' + e.message;
        console.log(return_err);
    });

};

let get_sentiments = function (documents) {
    let body = JSON.stringify (documents);

    let request_params = {
        method : 'POST',
        hostname : uri,
        path : path + 'sentiment',
        headers : {
            'Ocp-Apim-Subscription-Key' : accessKey,
        }
    };

    let req = https.request (request_params, response_handler);
    req.write (body);
    req.end ();
}

var documents = { 'documents': [
    { 'id': '1', 'language': 'en', 'text': 'I really enjoy the new XBox One S. It has a clean look, it has 4K/HDR resolution and it is affordable.' },
    { 'id': '2', 'language': 'es', 'text': 'Este ha sido un dia terrible, llegué tarde al trabajo debido a un accidente automobilistico.' },
]};


/* GET home page. */
router.get('/', async(req, res, next) => {
    await get_sentiments(documents);
    res.send(results);
});



module.exports = router;
