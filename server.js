var file = 'ROOT/server.js';

// Module dependencies
var application_root = __dirname,
    express = require( 'express' ), //Web framework
    path = require( 'path' ), //Utilities for dealing with file paths
    mongoose = require( 'mongoose' ), //MongoDB integration
    searchable = require('mongoose-searchable'), // text search in mongoDB
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler');


mongoose.Promise = Promise; //Yep, dirty hack fixed mongoose Promise :)

// Create server
var app = express();
// Configure server
// CORS on ExpressJS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// analysis body and prepare request.body
// app.use( bodyParser() );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );
// check request.body for override HTTP-methods
app.use( methodOverride() );
// search the route by URL and HTTP-methods
// app.use( app.router );
// where the static data are save
app.use( express.static( path.join( application_root, 'site') ) );
// show all errors during the developing
app.use( errorHandler({ dumpExceptions: true, showStack: true }));


// Start the server
var port = 4711;
app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode',
    port, app.settings.env );
});

app.get('/api', function(request, responce) {
    console.log('MyVideoApp ' + file + ' DOMAIN.COM/api :: Enter, MyVideoApp backend is working');
    responce.send('MyVideoApp Library for API is running');
});

// Connect to DB
mongoose.connect('mongodb://localhost/myVideoApp_database');
// Scheme
// For add subscheme to scheme, use squery brackets
var Film = new mongoose.Schema({
    id: Number,
    name: String,
    year: Number,
    posterSmall: String,
    poster: String,
    actors: [ String ],
    directors: [ String ],
    produsers: [ String ],
    synopsis: String,
});

Film.plugin(searchable); 

Film.index({'name': 'text'});

// The model. Since the collection is already created, need to add collection-name like third option.
var FilmModel = mongoose.model('Film', Film, 'FILMS');

Film.on('index', function (err) {
  if (err) console.error('CHECK INDEX', err); // error occurred during index creation
});

// REST API
// Get all films
app.get('/api/films/', function(request, responce) {
    console.log('MyVideoApp ' + file + ' DOMAIN.COM/api/films GET :: Enter');
    return FilmModel.find(function(err, films) {
        if (!err) {
            return responce.send(films);
        } else {
            return console.log('MyVideoApp ERROR :: ', err);
        }
    });

});

// Get array with searched films
app.get('/api/films/search', function(request, responce) {
    return FilmModel.search(request.query.q, function (err, data) {
        if (err) {
            return console.log(err);
        }
        return responce.send(data);
    });

});

// Get one film by id
app.get('/api/films/:id', function(request, responce) {
    console.log('MyVideoApp ' + file + ' DOMAIN.COM/api/films GET BY ID :: Enter, ID = >>>>>>>> ' + request.params.id + ' <<<<<<<<');
    return FilmModel.findById(request.params.id, function(err, books) {
        if (!err) {
            return responce.send(books);
        } else {
            return console.log('MyVideoApp ERROR :: ', err);
        }
    });

});