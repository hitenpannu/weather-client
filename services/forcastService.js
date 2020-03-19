const networkClient = require('../providers/networkClient.js');

const requestOption = (function prepareUrl(){
    const host = "localhost"
    const path = `/api/weather`

    return (location) => {
        return {
        protocol:'http:',
        hostname: host,
        path: path+`?region=${location}`,
        port: 5000,
        method: 'GET'
        }
    };
})()


module.exports = function(location){
    return new Promise((resolve, reject)=>{
        networkClient.makeRequest(
            requestOption(location),
            data=> resolve(data),
            error=> reject(error))
    })
};