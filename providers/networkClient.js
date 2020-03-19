const http = require('http');


function makeRequest(requestOption, successCallback, errorCallback){
    const request = http.request(requestOption, response => {
        let body = '';
        response.on('data', data => {
            body += data.toString();
        });

        response.on('close', ()=>{
            successCallback(JSON.parse(body));
        })
    });

    request.on('error', error => {
        errorCallback(error);
    })

    request.end()
}

module.exports = {makeRequest};
