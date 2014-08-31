/**
 * Created by randre03 on 8/30/14.
 */

var express =   require('express'),
    path =      require('path'),
    mongoose =  require('mongoose'),
    app_root =  __dirname;

var app = express();

app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(app_root, 'site')));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

//connect to the db
mongoose.connect('mongodb://localhost/library_database');

//Schemas

var Keywords = new mongoose.Schema({
    keyword:        String,
});

var Book = new mongoose.Schema({
    title:          String,
    author:         String,
    releaseDate:    Date,
    keywords:       [Keywords]
});

//Models
var BookModel = mongoose.model('Book', Book);

//routes
app.get('/api', function(req, res) {
    res.send('Library API is running');
});

app.get('/api/books/:id', function (req, res){
    return BookModel.findById(req.params.id, function(err, book) {
        if(!err) {
            res.send(book);
        } else {
            console.log(err);
        }
    });
});

app.get('/api/books', function (req, res){
    return BookModel.find(function (err, books){
        if(!err) {
            return res.send(books);
        } else {
            return console.log(err);
        }
    });
});

app.post('/api/books', function (req, res){
    var book = new BookModel({
        title:          req.body.title,
        author:         req.body.author,
        releaseDate:    req.body.releaseDate,
        keywords:       req.body.keywords
    });

    book.save(function (err){
        if(!err) {
            console.log('book record created');
        } else {
            console.log(err);
        }
    });

    res.send(book);
});

app.put('/api/books/:id', function (req, res){
    console.log('Updating Book ' + req.body.title);
    return BookModel.findById(req.params.id, function (err, book){
        book.title = req.body.title;
        book.author = req.body.author;
        book.releaseDate = req.body.releaseDate;
        book.keywords = req.body.keywords;

        return book.save(function (err){
            if(!err) {
                console.log('book updated');
            } else {
                console.log(err);
            }
        });
    });
});

app.delete('/api/books/:id', function (req, res){
    console.log('deleting book with id: ' + req.params.id);
    return BookModel.findById(req.params.id, function (err, book){
        return book.remove(function (err){
            if (!err) {
                console.log('Book deleted');
                res.send('');
            } else {
                console.log(err);
            }
        });
    });
});

//Start server
var port = 3000;
app.listen( port, function() {
    console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});