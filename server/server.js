const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const server = require('http').Server(app);

const mongoDBModule = require('./app_modules/crud-mongo');
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cross Origin Ressources
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

// Connexion à la base distante MongoDB Atlas
app.get('/api/connection', function (req, res) {
    mongoDBModule.connexionMongo(function (err, db) {
        let reponse;

        if (err) {
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

// Récupération des cas
app.get('/api/cas', function (req, res) {
    let page = parseInt(req.query.page || 1);
    let pagesize = parseInt(req.query.pagesize || 5);
    let name = req.query.name || '';

    mongoDBModule.findCasPub(page, pagesize, name, function (data, count) {
        var objdData = {
            msg: "Cas_Pub recherchés avec succès",
            data: data,
            count: count,
            page: page,
            pagesize: pagesize
        }

        res.send(JSON.stringify(objdData));
    });
});

// Récupération d'un cas avec son _id
app.get('/api/cas/:id', function (req, res) {
    var id = req.params.id;

    mongoDBModule.findCasById(id, function (data) {
        res.send(JSON.stringify(data));
    });

});

// Récupération des cas après filtrage
app.get('/api/filteredCas', function (req, res) {
    let form = JSON.parse(req.query.form);
    let page = parseInt(req.query.page || 1);
    let pagesize = parseInt(req.query.pagesize || 10);
    let name = req.query.name || '';

    mongoDBModule.findFilteredCas(form, page, pagesize, name, function (data, count) {
        var objdData = {
            msg: "Cas_Pub filtrés recherchés avec succès",
            data: data,
            count: count,
            page: page,
            pagesize: pagesize
        }
        res.send(JSON.stringify(objdData));
    });
});

// Count des cas par région
app.get('/api/countRegion', function (req, res) {
    let regions = req.query.regions.split(',');

    mongoDBModule.countCasByRegion(regions, function (data, count) {
        var objdData = {
            msg: "Cas_Pub count regions recherchés avec succès",
            count: count
        }
        res.send(JSON.stringify(objdData));
    });
});

// Count des cas par classe
app.get('/api/countClasse', function (req, res) {
    let classes = ["A", "B", "C", "D"]

    mongoDBModule.countCasByClasse(classes, function (data, count) {
        var objdData = {
            msg: "Cas_Pub count cas par classe recherchés avec succès",
            count: count
        }
        res.send(JSON.stringify(objdData));
    });
});

// Récupération des temoignages
app.get('/api/temoignages', function (req, res) {
    let page = parseInt(req.query.page || 1);
    let pagesize = parseInt(req.query.pagesize || 5);
    let name = req.query.name || '';

    mongoDBModule.findTemPub(page, pagesize, name, function (data, count) {
        var objdData = {
            msg: "Temoignages_Pub recherchés avec succès",
            data: data,
            count: count,
            page: page,
            pagesize: pagesize
        }

        res.send(JSON.stringify(objdData));
    });
});

// Récupération d'un temoignage avec son _id
app.get('/api/temoignages/:id', function (req, res) {
    var id = req.params.id;

    mongoDBModule.findTemoignageById(id, function (data) {
        res.send(JSON.stringify(data));
    });
});

// Récupération des temoignages d'un cas par son id
app.get('/api/castemoignages/:id', function (req, res) {
    var id = req.params.id;

    mongoDBModule.findTemoignageByCasId(id, function (data) {
        res.send(JSON.stringify(data));
    });

});