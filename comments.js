
// Create web server
var express = require('express');
var app = express();

// Allow cross-origin resource sharing (CORS)
var cors = require('cors');
app.use(cors());

// Parse JSON
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Connect to database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/comments');

// Create schema
var commentSchema = mongoose.Schema({
    name: String,
    comment: String
});

// Create model
var Comment = mongoose.model('Comment', commentSchema);

// Get all comments
app.get('/comments', function(req, res) {
    Comment.find(function(err, comments) {
        if (err) {
            res.send(err);
        } else {
            res.json(comments);
        }
    });
});

// Create a comment
app.post('/comments', function(req, res) {
    var comment = new Comment(req.body);
    comment.save(function(err) {
        if (err) {
            res.send(err);
        } else {
            res.send({ message: 'Comment created' });
        }
    });
});

// Start web server
app.listen(8080);
console.log('Server running on port 8080');