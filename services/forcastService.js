const configurations = require("../config");
const currentConfig = configurations.configuration(configurations.Environment.REMOTE)

const request = require("request-promise");

const requestOption = (function prepareUrl(){
    const uri = currentConfig.API + `/api/weather` 
    
    return (location) => {
        return {
        uri: uri+`?region=${location}`,
        json: true
        }
    };
})()


module.exports = function(location){
    const options = requestOption(location);
    return request(options)
};