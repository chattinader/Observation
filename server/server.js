const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const server = require('http').Server(app);

const mongoDBModule = require('./app_modules/crud-mongo');
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");

    next();
});

// Lance le serveur avec express
server.listen(port);
console.log("Server listening on port " + port);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// connexion à la base
app.get('/api/connection', function (req, res) {
    mongoDBModule.connexionMongo(function (err, db) {
        let reponse;

        if (err) {
            console.log("erreur connexion");
            reponse = {
                msg: "erreur de connexion err=" + err
            }
        } else {
            reponse = {
                msg: "connexion établie"
            }
        }
        res.send(JSON.stringify(reponse));
    });
});