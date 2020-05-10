var mysql = require('mysql');
var express = require('express');
var bodyparser = require('body-parser');
var path = require('path');

var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

var sqlserver = mysql.createConnection({

    host: 'localhost',
    user: 'mysql',
    password: 'kazuo',
    database: 'cs665'
});

// Test connection
sqlserver.connect(function(error){

    if(error){

        console.log("Failed to connect to mysql server.");
        throw error;
    }

    console.log("Connected to mysql server.");
});

app.get('/', function(request, response){

    response.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/index.css', function(request, response){

    response.sendFile(path.join(__dirname + '/index.css'));
});
app.get('/index.js', function(request, response){

    response.sendFile(path.join(__dirname + '/index.js'));
});

app.post('/search', function(request, response){

    var response_content = {

        book_count: 0,
        book_title: [],
        book_author: [],
        book_isbn: [],
        movie_count: 0,
        movie_title: [],
        movie_year: [],
        movie_star: [],
        movie_genre: [],
        album_count: 0,
        album_artist: [],
        album_title: [],
        album_release: [],
        album_genre: []
    };

    if(request.body.searchFor == "Books"){

        var search_by_mapping = {

            "Title": "books.title",
            "Author": "books.author",
            "ISBN": "books.isbn"
        };
        sqlserver.query("SELECT * FROM books WHERE " + search_by_mapping[request.body.searchBy] + " LIKE ?", ['%' + request.body.searchText + '%'], function(error, results){

            if(error){

                throw error;
            }

            response_content.book_count = results.length;
            for(var i = 0; i < results.length; i++){

                response_content.book_title.push(results[i].title); 
                response_content.book_author.push(results[i].author);
                response_content.book_isbn.push(results[i].isbn);
            }
            response.setHeader("Content-Type", "application/json");
            response.end(JSON.stringify(response_content));
        });

    }else if(request.body.searchFor == "Movie"){

        var search_by_mapping = {

            "Title": "movies.title",
            "Year": "movies.year",
            "Star": "movies.star",
            "Genre": "movies.genre"
        };
        sqlserver.query("SELECT * FROM movies WHERE " + search_by_mapping[request.body.searchBy] + " LIKE ?", ['%' + request.body.searchText + '%'], function(error, results){

            if(error){

                throw error;
            }

            response_content.movie_count = results.length;
            for(var i = 0; i < results.length; i++){

                response_content.movie_title.push(results[i].title); 
                response_content.movie_year.push(results[i].year);
                response_content.movie_star.push(results[i].star);
                response_content.movie_genre.push(results[i].genre);
            }
            response.setHeader("Content-Type", "application/json");
            response.end(JSON.stringify(response_content));
        });

    }else if(request.body.searchFor == "Album"){

        var search_by_mapping = {

            "Title": "albums.title",
            "Artist": "albums.artist",
            "Release Date": "albums.release_date",
            "Genre": "albums.genre"
        };
        sqlserver.query("SELECT title, artist, DATE_FORMAT(release_date, '%m/%d/%Y') AS date, genre FROM albums WHERE " + search_by_mapping[request.body.searchBy] + " LIKE ?", ['%' + request.body.searchText + '%'], function(error, results){

            if(error){

                throw error;
            }

            response_content.album_count = results.length;
            for(var i = 0; i < results.length; i++){

                response_content.album_title.push(results[i].title); 
                response_content.album_artist.push(results[i].artist);
                response_content.album_release.push(results[i].date);
                response_content.album_genre.push(results[i].genre);
            }
            response.setHeader("Content-Type", "application/json");
            response.end(JSON.stringify(response_content));
        });
    }
});

app.listen(8080);
