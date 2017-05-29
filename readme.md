## Synopsis

Backend server for angular test app - MyVideoApp.

## Installation

For installing all dependencies run commands below:

```
git clone https://github.com/TODO  
npm install   
npm start 
```

REMEMBER. You need to preinstall mongodb to your local computer or server. Create db, collection and fill mock data from mock.json to collection. I used mongobuster app for Mac. Or you can create your own data using scheme in server.js

### Make your changes in server.js

```javascript
mongoose.connect('mongodb://localhost/myVideoApp_database');
```

 Use your own IP or domain for mongodb server and name for db

```javascript
var FilmModel = mongoose.model('Film', Film, 'FILMS');
```

Change 'FILMS' to your collection names if you create collection manual or remove. Check code-comments in server.js for more information.

## API Reference

You can use this url for get data from your backend.

| URL                       | Returned Type | Description                              |
| ------------------------- | ------------- | ---------------------------------------- |
| /api                      | String        | Return string with message wich confirm normal work. |
| /api/films/               | [ Object ]    | Return array of objects with all films in library |
| /api/films/search?q=WORDS | [ Object ]    | Return array of objects with films wich found in library, using WORDS |
| /api/films/:id            | [ Object ]    | Return array of objects, with one object wich have the same id in collection. |

## Tests

TODO :)

## Contributors

Yep, I can made a mistakes in code or this file and so on. So, if you would have any comment, I would be happy reseived pull-request for you. Or, you can create issue and even send me email.

## License

(MIT.)