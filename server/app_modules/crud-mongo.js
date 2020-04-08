var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Connection URL
const url = 'mongodb+srv://lemurien:lemurien@lemurien-f2pky.mongodb.net/test?retryWrites=true&w=majority';

// Database Name
const dbName = 'lemurien';

exports.connexionMongo = function (callback) {
    MongoClient.connect(url, function (err, client) {
        var db = client.db(dbName);

        assert.equal(null, err);
        callback(err, db);
    });
}