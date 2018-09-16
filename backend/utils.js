'use strict';

var https = require('https');

var accessKey = '4218174ec34d497091344c8ab42c0587';
var results = null;

let uri = 'eastus.api.cognitive.microsoft.com';
let path = '/text/analytics/v2.0/';

let response_handler = function (response) {
    let body = '';

    let return_err;
    response.on ('data', function (d) {
        body += d;
    });
    response.on ('end', function () {
        let body_ = JSON.parse (body);
        let body__ = JSON.stringify (body_, null, '  ');
        results = body_;
    });
    response.on ('error', function (e) {
        return_err = 'Error: ' + e.message;
        console.log(return_err);
    });

};

let get_sentiments = async (documents) => {
    let body = JSON.stringify (documents);

    let request_params = {
        method : 'POST',
        hostname : uri,
        path : path + 'sentiment',
        headers : {
            'Ocp-Apim-Subscription-Key' : accessKey,
        }
    };

    let req = await https.request (request_params, response_handler);
    req.write (body);
    req.end ();
}

let export_data = async(texts) => {
    let documents = {};

    let documents_arr = [];
    let dates = [];
    let count = 1;

    for (let text_obj in texts) {

        let doc_obj = {
            'id': count,
            'language': 'en',
            'text': texts[text_obj]['text']
        }

        dates.push(texts[text_obj]['date']);
        documents_arr.push(doc_obj);

        count++;
    }


    documents['documents'] = documents_arr.slice(documents_arr.length - 100);
    await get_sentiments(documents);

    for (let result in results['documents']) {
        results['documents'][result]['date'] = dates[results['documents'][result]['id']];
        console.log(results['documents'][result]);
    }

    return JSON.stringify(results);
}



module.exports = {
    export_data
}