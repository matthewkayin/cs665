//5/9/2020

const changeElem = function(id){
    //get value
    var query = document.getElementById("results").value;
    
    //send query to SQL server
    //sendSearch(query);

    //output search values
    document.getElementById(id).innerHTML = query;
    
}

const clearTables = function(){
    //clear all tables except for headings
    var table = document.getElementById("books");    
    while (table.childNodes.length > 5){
         table.removeChild(table.lastChild);
    }    

    var table = document.getElementById("movies");
    while (table.childNodes.length > 5){
        table.removeChild(table.lastChild);
    }

    var table = document.getElementById("albums");
    while (table.childNodes.length > 5){
        table.removeChild(table.lastChild);
    }
}


//add content to a table
const fillTables = function(data){
    
    clearTables();
    
    //books displayed like this: <Title> <Author> <ISBN>
    for (let i = 0; i < data.book_count; i++){
        
        newRow = document.createElement("TR");//create new row
        newCell = document.createElement("TD");//create new cell
        
        newCell.innerHTML = data.book_title[i];//add text to cell
        newRow.appendChild(newCell);//add the new cell to the row
        
        //repeat all except new row for the rest of the columns
        newCell = document.createElement("TD");//create new cell
        newCell.innerHTML = data.book_author[i];
        newRow.appendChild(newCell);
        
        newCell = document.createElement("TD");//create new cell
        newCell.innerHTML = data.book_isbn[i];
        newRow.appendChild(newCell);
        
        document.getElementById("books").appendChild(newRow);//add new row to table
    }
    
    //movies displayed like this: <Title> <Year> <Star> <Genre>
    for (let i = 0; i < data.movie_count; i++){
        
        newRow = document.createElement("TR");//create new row
        newCell = document.createElement("TD");//create new cell
        
        newCell.innerHTML = data.movie_title[i];//add text to cell
        newRow.appendChild(newCell);//add the new cell to the row
        
        //repeat all except new row for the rest of the columns
        newCell = document.createElement("TD");//create new cell
        newCell.innerHTML = data.movie_year[i];
        newRow.appendChild(newCell);
        
        newCell = document.createElement("TD");//create new cell
        newCell.innerHTML = data.movie_star[i];
        newRow.appendChild(newCell);
        
        newCell = document.createElement("TD");//create new cell
        newCell.innerHTML = data.movie_genre[i];
        newRow.appendChild(newCell);
        document.getElementById("movies").appendChild(newRow);//add new row to table
    }
    
    
    //albums displayed like this: <Title> <Artist> <Release Date> <Genre>
    for (let i = 0; i < data.albums_count; i++){
        //TODO: find out why the albums aren't displaying correctly
        
        newRow = document.createElement("TR");//create new row
        newCell = document.createElement("TD");//create new cell
        
        newCell.innerHTML = data.album_title[i];//add text to cell
        newRow.appendChild(newCell);//add the new cell to the row

        //repeat all except new row for the rest of the columns
        newCell = document.createElement("TD");//create new cell
        newCell.innerHTML = data.album_artist[i];
        newRow.appendChild(newCell);

        newCell = document.createElement("TD");//create new cell
        newCell.innerHTML = data.album_release[i];
        newRow.appendChild(newCell);

        newCell = document.createElement("TD");//create new cell
        newCell.innerHTML = data.album_genre[i];
        newRow.appendChild(newCell);
 
        document.getElementById("albums").appendChild(newRow);//add new row to table
    }
}

const populateSearchBy = function(){
    //remove current options from dropdown
    var searchBy = document.getElementById("searchBy");
    
    while (searchBy.firstChild){
        searchBy.removeChild(searchBy.lastChild);
    }

    var bookAttributes = [
        "Title",
        "Author",
        "ISBN"
    ];

    var movieAttributes = [
        "Title",
        "Year",
        "Star",
        "Genre",
    ];

    var albumAttributes = [
        "Title",
        "Artist",
        "Release Date",
        "Genre"
    ];

    var cardAttributes = [
        "Title",
        "Checked Out",
        "Due Date"
    ];
    
   
    
    var searchingFor = document.getElementById("searchFor").value;
    
    var node, textnode;

    switch (searchingFor){
        case "Books":{
            document.getElementById("searchBy").disabled = false;
            for (let i = 0; i < bookAttributes.length; i++){
                node = document.createElement("OPTION");
                node.innerHTML = bookAttributes[i];
                searchBy.appendChild(node);
            }
            break;
        }
        case "Movie":{
            document.getElementById("searchBy").disabled = false;
            for (let i = 0; i < movieAttributes.length; i++){
                node = document.createElement("OPTION");
                node.innerHTML = movieAttributes[i];
                searchBy.appendChild(node);
            }
            break;
        }
        case "Album":{
            document.getElementById("searchBy").disabled = false;
            for (let i = 0; i < albumAttributes.length; i++){
                node = document.createElement("OPTION");
                node.innerHTML = albumAttributes[i];
                searchBy.appendChild(node);
            }
            break;
        }
        case "Card":{
            document.getElementById("searchBy").disabled = true;
            for (let i = 0; i < cardAttributes.length; i++){
                node = document.createElement("OPTION");
                node.innerHTML = cardAttributes[i];
                searchBy.appendChild(node);
            }
            break;
        }
        case "All":
            node = document.createElement("OPTION");
            node.innerHTML = "Title";
            searchBy.appendChild(node);
            document.getElementById("searchBy").disabled = false;
    }
}


const sendSearch = function(){
    var xhr = new XMLHttpRequest();
    // the /search is the url you're getting from, relative to the site
    
    
    xhr.open("GET", "/search", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.responseType = "json";
    
    xhr.send(JSON.stringify({
        //TODO: put values here from the query: searchFor, searchBy, searchText
        searchFor: "books",
        searchBy: "title",
        searchText: "Lord of the Rings"
        /* searchFor : document.getElementById("searchFor").value,
        searchBy : document.getElementById("searchBy").value,
        searchText : document.getElementById("results").tex */
    }));

    xhr.onreadystatechange = function(){

        //readyState 4 means that the request is done
        if(xhr.readyState == 4){
            //deal with the data according to what was searched for
            var searchingFor = document.getElementById("searchFor").value;
            var json = xhr.response;

            fillTables(json);
            console.log(json);
        }
    };
}

//test data for fillTables()
var test = {
    book_count: 1,
    book_isbn:[31452950],
    book_title:["The Lord of the Rings"],
    book_author:["JRR Tolkien"],
    book_genre:["Fantasy"],
    movie_count:1,
    movie_title:["The Lord of the Rings"],
    movie_year:[2001],
    movie_star:["Ian McKellan"],
    movie_genre:["Fantasy"],
    album_count:3,
    album_title:["Fellowship of the Ring","The Two Towers","The Return of the King"],
    album_release:[2001,2002,2003],
    album_count:["Howard Shore","Howard Shore","Howard Shore"],
    album_genre:["soundtrack","soundtrack","soundtrack"]
}

