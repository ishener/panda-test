var databaseUrl = "mongodb://bigpanda_user:VZiNeE1ApPG6@aws-us-east-1-portal.15.dblayer.com:15497,aws-us-east-1-portal.16.dblayer.com:15497/bigpanda";
var MongoClient = require('mongodb').MongoClient;
var Promise = require('promise');


var getComments = function(resolve, reject) {
    MongoClient.connect(databaseUrl, function(err, db) {
        if(!err) {
            var collection = db.collection('comments');
            var comments = [];

            var stream = collection.find({type: "comment"}).stream();
            stream.on("data", function(item) {
                comments.push(item);
            });
            stream.on("end", function() {
                resolve(comments);
            });
        } else {
            console.log(err);
        }
    });
};

module.exports = {
    getComments: function () {
        return new Promise(getComments);
    },
    saveComment: function(comment) {
        MongoClient.connect(databaseUrl, function(err, db) {
            if(!err) {
                var collection = db.collection('comments');
                comment.type = "comment";
                collection.insert(comment);
            } else {
                console.log(err);
            }
        });
    }
};
