var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');

// URL de connexion
const url = 'mongodb+srv://lemurien:lemurien@lemurien-f2pky.mongodb.net/test?retryWrites=true&w=majority';

// Nom de la base de données
const dbName = 'lemurien';

// Connexion à la base distante MongoDB Atlas
exports.connexionMongo = function (callback) {
    MongoClient.connect(url, function (err, client) {
        var db = client.db(dbName);

        assert.equal(null, err);
        callback(err, db);
    });
}

// Count de données dans la collection cas_pub
exports.countCasPub = function (name, callback) {
    MongoClient.connect(url, function (err, client) {
        var db = client.db(dbName);

        if (!err) {
            if (name == '') {
                db.collection('cas_pub')
                    .count()
                    .then(rep => callback(rep));
            } else {
                let query = {
                    "name": { $regex: ".*" + name + ".*", $options: "i" }
                }
                db.collection('cas_pub')
                    .find(query)
                    .count()
                    .then(rep => callback(rep));
            }
        }
    });
};

// Récupération des cas
exports.findCasPub = function (page, pagesize, name, callback) {
    MongoClient.connect(url, function (err, client) {
        var db = client.db(dbName);

        if (!err) {
            if (name == '') {
                db.collection('cas_pub')
                    .find()
                    .skip(page * pagesize)
                    .limit(pagesize)
                    .toArray()
                    .then(arr => {
                        db.collection('cas_pub')
                            .count()
                            .then(rep => callback(arr, rep))
                    });
            }
            else {
                let query = {
                    "name": { $regex: ".*" + name + ".*", $options: "i" }
                }
                db.collection('cas_pub')
                    .find(query)
                    .skip(page * pagesize)
                    .limit(pagesize)
                    .toArray()
                    .then(arr => {
                        db.collection('cas_pub')
                            .find(query)
                            .count()
                            .then(rep => callback(arr, rep))
                    });
            }
        }
        else {
            callback(-1);
        }
    });
};

// Count de données dans la collection temoignages_pub
exports.countCasPub = function (name, callback) {
    MongoClient.connect(url, function (err, client) {
        var db = client.db(dbName);

        if (!err) {
            if (name == '') {
                db.collection('temoignages_pub')
                    .count()
                    .then(rep => callback(rep));
            } else {
                let query = {
                    "name": { $regex: ".*" + name + ".*", $options: "i" }
                }
                db.collection('temoignages_pub')
                    .find(query)
                    .count()
                    .then(rep => callback(rep));
            }
        }
    });
};

// Récupération d'un cas avec son _id
exports.findCasById = function (id, callback) {
    MongoClient.connect(url, function (err, client) {
        var db = client.db(dbName);
        if (!err) {
            // La requete mongoDB
            let myquery = { "_id": ObjectId(id) };

            db.collection("cas_pub")
                .findOne(myquery, function (err, data) {
                    let reponse;

                    if (!err) {
                        reponse = {
                            succes: true,
                            cas: data,
                            error: null,
                            msg: "Details du cas envoyés"
                        };
                    } else {
                        reponse = {
                            succes: false,
                            cas: null,
                            error: err,
                            msg: "erreur lors du find"
                        };
                    }
                    callback(reponse);
                });
        } else {
            let reponse = reponse = {
                succes: false,
                cas: null,
                error: err,
                msg: "erreur de connexion à la base"
            };
            callback(reponse);
        }
    });
}

// Récupération des cas après filtrage
exports.findFilteredCas = function (form, page, pagesize, name, callback) {
    MongoClient.connect(url, function (err, client) {
        var db = client.db(dbName);

        if (!err) {
            if (JSON.stringify(form) == `{"cas_classification":"TOUS"}`) {
                db.collection("cas_pub")
                    .find({})
                    .skip(page * pagesize)
                    .limit(pagesize)
                    .toArray()
                    .then(arr => {
                        db.collection('cas_pub')
                            .count()
                            .then(rep => callback(arr, rep))
                    });
            } else {
                let myquery = {};
                if (form.motCle !== undefined) {
                    Object.assign(myquery, ({ "cas_resume": { $regex: ".*" + form.motCle + ".*" } }))
                }
                if (form.cas_classification == "TOUS") {
                    delete form.cas_classification;
                } else {
                    let classe = JSON.stringify(form.cas_classification).split(",")
                    let queryClasses = []
                    classe.forEach(c => {
                        if (c[0] == '"') { c = c.substr(1, c.length - 1) }
                        if (c[c.length - 1] == '"') { c = c.substr(0, c.length - 1) }
                        queryClasses.push({ "cas_classification": c })
                    })
                    Object.assign(myquery, { $or: queryClasses })
                }

                let etatDuDate = form.cas_date_du !== undefined
                let etatAuDate = form.cas_date_au !== undefined
                if (etatDuDate && etatAuDate) {
                    Object.assign(myquery, {
                        $and: [
                            { "cas_date": { $gte: new Date(form.cas_date_du) } },
                            { "cas_date": { $lte: new Date(form.cas_date_au) } }
                        ]
                    })
                } else if (etatDuDate) {
                    Object.assign(myquery, { "cas_date": { $gte: new Date(form.cas_date_du) } })
                } else if (etatAuDate) {
                    Object.assign(myquery, { "cas_date": { $lte: new Date(form.cas_date_au) } })
                }
                if (form.cas_zone_nom !== undefined) {
                    let zone = JSON.stringify(form.cas_zone_nom).split(",")
                    let queryZones = []
                    zone.forEach(z => {
                        if (z[0] == '"') { z = z.substr(1, z.length - 1) }
                        if (z[z.length - 1] == '"') { z = z.substr(0, z.length - 1) }
                        queryZones.push({ "cas_region": z })
                    })
                    Object.assign(myquery, { $or: queryZones })
                }
                db.collection("cas_pub")
                    .find(myquery)
                    .skip(page * pagesize)
                    .limit(pagesize)
                    .toArray()
                    .then(arr => {
                        db.collection('cas_pub')
                            .count(myquery)
                            .then(rep => callback(arr, rep))
                    });
            }
        } else {
            let reponse = reponse = {
                succes: false,
                cas: null,
                error: err,
                msg: "erreur de connexion à la base"
            };
            callback(reponse);
        }
    });
}

// Count des cas par région
exports.countCasByRegion = function (region, callback) {
    MongoClient.connect(url, function (err, client) {
        var db = client.db(dbName);

        if (!err) {
            let myquery = { "cas_region": region }
            db.collection("cas_pub")
                .find(myquery)
                .toArray()
                .then(arr => {
                    db.collection('cas_pub')
                        .count(myquery)
                        .then(rep => callback(arr, rep))
                });
        } else {
            let reponse = reponse = {
                succes: false,
                cas: null,
                error: err,
                msg: "erreur de connexion à la base"
            };
            callback(reponse);
        }
    });
}

// Récupération des temoignages
exports.findTemPub = function (page, pagesize, name, callback) {
    MongoClient.connect(url, function (err, client) {
        var db = client.db(dbName);

        if (!err) {
            if (name == '') {
                db.collection('temoignages_pub')
                    .find()
                    .skip(page * pagesize)
                    .limit(pagesize)
                    .toArray()
                    .then(arr => {
                        db.collection('temoignages_pub')
                            .count()
                            .then(rep => callback(arr, rep))
                    });
            }
            else {
                let query = {
                    "name": { $regex: ".*" + name + ".*", $options: "i" }
                }
                db.collection('temoignages_pub')
                    .find(query)
                    .skip(page * pagesize)
                    .limit(pagesize)
                    .toArray()
                    .then(arr => {
                        db.collection('temoignages_pub')
                            .find(query)
                            .count()
                            .then(rep => callback(arr, rep))
                    });
            }
        }
        else {
            callback(-1);
        }
    });
};

// Récupération des temoignages
exports.findTemoignageById = function (id, callback) {
    MongoClient.connect(url, function (err, client) {
        var db = client.db(dbName);
        if (!err) {
            // La requete mongoDB
            let myquery = { "_id": ObjectId(id) };

            db.collection("temoignages_pub")
                .findOne(myquery, function (err, data) {
                    let reponse;

                    if (!err) {
                        reponse = {
                            succes: true,
                            temoignage: data,
                            error: null,
                            msg: "Details du temoignage envoyés"
                        };
                    } else {
                        reponse = {
                            succes: false,
                            temoignage: null,
                            error: err,
                            msg: "erreur lors du find"

                        };
                    }
                    callback(reponse);
                });
        } else {
            let reponse = reponse = {
                succes: false,
                temoignage: null,
                error: err,
                msg: "erreur de connexion à la base"
            };
            callback(reponse);
        }
    });
}

// Récupération d'un temoignage avec son _id
exports.findTemoignageByCasId = function (id, callback) {
    MongoClient.connect(url, function (err, client) {
        var db = client.db(dbName);
        if (!err) {
            // La requete mongoDB
            let myquery = { "id_cas": parseInt(id) };
            db.collection("temoignages_pub").find(myquery).toArray(function (err, data) {
                let reponse;

                if (!err) {
                    reponse = {
                        succes: true,
                        temoignage: data,
                        error: null,
                        msg: "Details du cas filtré envoyés"
                    };
                } else {
                    reponse = {
                        succes: false,
                        temoignage: null,
                        error: err,
                        msg: "erreur lors du find"

                    };
                }
                callback(reponse);
            });
        } else {
            let reponse = reponse = {
                succes: false,
                temoignage: null,
                error: err,
                msg: "erreur de connexion à la base"
            };
            callback(reponse);
        }
    });
}