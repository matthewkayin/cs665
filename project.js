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
        book_availability: [],
        movie_count: 0,
        movie_title: [],
        movie_year: [],
        movie_star: [],
        movie_genre: [],
        movie_availability: [],
        album_count: 0,
        album_artist: [],
        album_title: [],
        album_release: [],
        album_genre: [],
        album_availability: [],
    };

    if(request.body.searchFor == "Books"){

        var search_by_mapping = {

            "Title": "books.title",
            "Author": "books.author",
            "ISBN": "books.isbn"
        };
        sqlserver.query("SELECT title, author, isbn, DATE_FORMAT(due_date, '%m/%d/%Y') AS due_date FROM books WHERE " + search_by_mapping[request.body.searchBy] + " LIKE ?", ['%' + request.body.searchText + '%'], function(error, results){

            if(error){

                throw error;
            }

            response_content.book_count = results.length;
            for(var i = 0; i < results.length; i++){

                response_content.book_title.push(results[i].title); 
                response_content.book_author.push(results[i].author);
                response_content.book_isbn.push(results[i].isbn);
                if(results[i].due_date == null){

                    response_content.book_availability.push("Availabile");

                }else{

                    response_content.book_availability.push("Due " + results[i].due_date);
                }
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
        sqlserver.query("SELECT title, year, star, genre, DATE_FORMAT(due_date, '%m/%d/%Y') AS due_date FROM movies WHERE " + search_by_mapping[request.body.searchBy] + " LIKE ?", ['%' + request.body.searchText + '%'], function(error, results){

            if(error){

                throw error;
            }

            response_content.movie_count = results.length;
            for(var i = 0; i < results.length; i++){

                response_content.movie_title.push(results[i].title); 
                response_content.movie_year.push(results[i].year);
                response_content.movie_star.push(results[i].star);
                response_content.movie_genre.push(results[i].genre);
                if(results[i].due_date == null){

                    response_content.movie_availability.push("Available");

                }else{

                    response_content.movie_availability.push("Due " + results[i].due_date);
                }
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
        sqlserver.query("SELECT title, artist, DATE_FORMAT(release_date, '%m/%d/%Y') AS date, genre, DATE_FORMAT(due_date, '%m/%d/%Y') AS due_date FROM albums WHERE " + search_by_mapping[request.body.searchBy] + " LIKE ?", ['%' + request.body.searchText + '%'], function(error, results){

            if(error){

                throw error;
            }

            response_content.album_count = results.length;
            for(var i = 0; i < results.length; i++){

                response_content.album_title.push(results[i].title); 
                response_content.album_artist.push(results[i].artist);
                response_content.album_release.push(results[i].date);
                response_content.album_genre.push(results[i].genre);
                if(results[i].due_date == null){

                    response_content.album_availability.push("Available");

                }else{

                    response_content.album_availability.push("Due " + results[i].due_date);
                }
            }
            response.setHeader("Content-Type", "application/json");
            response.end(JSON.stringify(response_content));
        });

    }else if(request.body.searchFor == "All"){

        sqlserver.query("SELECT title, author, isbn, DATE_FORMAT(due_date, '%m/%d/%Y') AS due_date FROM books WHERE books.title LIKE ?", ['%' + request.body.searchText + '%'], function(book_error, book_results){

            if(book_error){

                throw book_error;
            }

            response_content.book_count = book_results.length;
            for(var i = 0; i < book_results.length; i++){

                response_content.book_title.push(book_results[i].title); 
                response_content.book_author.push(book_results[i].author);
                response_content.book_isbn.push(book_results[i].isbn);
                if(book_results[i].due_date == null){

                    response_content.book_availability.push("Available");

                }else{

                    response_content.book_availability.push("Due " + book_results[i].due_date);
                }
            }

            sqlserver.query("SELECT title, year, star, genre, DATE_FORMAT(due_date, '%m/%d/%Y') AS due_date FROM movies WHERE movies.title LIKE ?", ['%' + request.body.searchText + '%'], function(movie_error, movie_results){

                if(movie_error){

                    throw movie_error;
                }

                response_content.movie_count = movie_results.length;
                for(var i = 0; i < movie_results.length; i++){

                    response_content.movie_title.push(movie_results[i].title); 
                    response_content.movie_year.push(movie_results[i].year);
                    response_content.movie_star.push(movie_results[i].star);
                    response_content.movie_genre.push(movie_results[i].genre);
                    if(movie_results[i].due_date == null){

                        response_content.movie_availability.push("Available");

                    }else{

                        response_content.movie_availability.push("Due " + movie_results[i].due_date);
                    }
                }

                sqlserver.query("SELECT title, artist, DATE_FORMAT(release_date, '%m/%d/%Y') AS date, genre, DATE_FORMAT(due_date, '%m/%d/%Y') AS due_date FROM albums WHERE albums.title LIKE ?", ['%' + request.body.searchText + '%'], function(album_error, album_results){

                    if(album_error){

                        throw album_error;
                    }

                    response_content.album_count = album_results.length;
                    for(var i = 0; i < album_results.length; i++){

                        response_content.album_title.push(album_results[i].title); 
                        response_content.album_artist.push(album_results[i].artist);
                        response_content.album_release.push(album_results[i].date);
                        response_content.album_genre.push(album_results[i].genre);
                        if(album_results[i].due_date == null){

                            response_content.album_availability.push("Available");

                        }else{

                            response_content.album_availability.push("Due " + album_results[i].due_date);
                        }
                    }
                    response.setHeader("Content-Type", "application/json");
                    response.end(JSON.stringify(response_content));
                });
            });
        });

    }else if(request.body.searchFor == "Card"){

        sqlserver.query("SELECT books.title AS title, books.author AS author, books.isbn AS isbn, DATE_FORMAT(books.due_date, '%m/%d/%Y') AS due_date FROM books, customers WHERE customers.card_number = ? AND customers.card_number = books.card_number", [request.body.searchText], function(book_error, book_results){

            if(book_error){

                throw book_error;
            }

            response_content.book_count = book_results.length;
            for(var i = 0; i < book_results.length; i++){

                response_content.book_title.push(book_results[i].title); 
                response_content.book_author.push(book_results[i].author);
                response_content.book_isbn.push(book_results[i].isbn);
                response_content.book_availability.push("Due " + book_results[i].due_date);
            }

            sqlserver.query("SELECT movies.title AS title, movies.year AS year, movies.star AS star, movies.genre AS genre, DATE_FORMAT(movies.due_date, '%m/%d/%Y') AS due_date FROM movies, customers WHERE customers.card_number = ? AND customers.card_number = movies.card_number", [request.body.searchText], function(movie_error, movie_results){

                if(movie_error){

                    throw movie_error;
                }

                response_content.movie_count = movie_results.length;
                for(var i = 0; i < movie_results.length; i++){

                    response_content.movie_title.push(movie_results[i].title); 
                    response_content.movie_year.push(movie_results[i].year);
                    response_content.movie_star.push(movie_results[i].star);
                    response_content.movie_genre.push(movie_results[i].genre);
                    response_content.movie_availability.push("Due " + movie_results[i].due_date);
                }

                sqlserver.query("SELECT albums.title AS title, albums.artist AS artist, DATE_FORMAT(albums.release_date, '%m/%d/%Y') AS date, albums.genre AS genre, DATE_FORMAT(albums.due_date, '%m/%d/%Y') AS due_date FROM albums, customers WHERE customers.card_number LIKE ? AND customers.card_number = albums.card_number", [request.body.searchText], function(album_error, album_results){

                    if(album_error){

                        throw album_error;
                    }

                    response_content.album_count = album_results.length;
                    for(var i = 0; i < album_results.length; i++){

                        response_content.album_title.push(album_results[i].title); 
                        response_content.album_artist.push(album_results[i].artist);
                        response_content.album_release.push(album_results[i].date);
                        response_content.album_genre.push(album_results[i].genre);
                        response_content.album_availability.push(album_results[i].due_date);
                    }
                    response.setHeader("Content-Type", "application/json");
                    response.end(JSON.stringify(response_content));
                });
            });
        });
    }
});

app.listen(8080);
