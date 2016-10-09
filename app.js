var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var comments = require('./model/comments');

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/save', function (req, res) {
    comments.saveComment(req.body);
    res.send('OK');
});
app.get('/get-comments', function (req, res) {
    comments.getComments().then(function (data) {
        res.send(data);
    });

});

app.listen(3198, function () {
    console.log('listening on port 3198');
});