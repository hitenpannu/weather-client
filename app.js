// import remote dependencies
const templateEngine = require('hbs');
const express = require('express');
const app = express();

// import node module
const path = require('path');

// import local modules
const forcaseService = require("./services/forcastService");

// setup template engine
const pathToPartials = path.join(__dirname, "templates/partials");
templateEngine.registerPartials(pathToPartials);

const pathToViews = path.join(__dirname, "templates/views");
app.set("views", pathToViews);
app.set("view engine", 'hbs');

// server public content
const publicDirectoryPath = path.join(__dirname,"public");
app.use(express.static(publicDirectoryPath));

// Allow express to read form data
app.use(express.urlencoded())

// initialize the entry point for website
const minimumObject = {title: "Weather app"}
app.get('/', (request, response)=>{
    const pageSpecific = {isWeather: true}
    const data = Object.assign(pageSpecific,minimumObject)
    return response.render('index',data)
})

app.get('/about', (request, response)=>{
    const pageSpecific = {isAbout: true}
    const data = Object.assign(pageSpecific,minimumObject)
    return response.render('index',data)
})

app.get('/help', (request, response)=>{
    const pageSpecific = {isHelp: true}
    const data = Object.assign(pageSpecific,minimumObject)
    return response.render('index',data)
})

app.post('/weather', (request, response)=>{
    return forcaseService(escape(request.body.region))
    .then((jsonResponse)=>{
        response.send(jsonResponse);
    })
    .catch((error)=>{
        console.log(error);
    })
    ;
})

app.get('*',(request, response)=>{
    const pageSpecific = {is404: true};
    const data = Object.assign(pageSpecific, minimumObject);
    return response.render('index', data);
})


app.listen(3000, ()=>{
    console.log("Started Client")
})
