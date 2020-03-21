const localConfig = {
    API: "http://localhost:5000"
}

const remoteConfig = {
    API: "https://weather-server-hiten.herokuapp.com"
}

const Environment = {
    LOCAL : "LOCAL",
    REMOTE : "REMOTE"
}

const configuration =  (environment)=>{
    if(environment == Environment.LOCAL){
        // Local environment
        return localConfig
    }else if(environment == Environment.REMOTE){
        // remote environment
        return remoteConfig
    }else{
        throw "Unsupported environment"
    }
}

module.exports = {configuration, Environment}