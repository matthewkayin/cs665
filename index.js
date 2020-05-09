//5/9/2020

const changeElem = function(id){
    //get value
    var query = document.getElementById("results").value;
    
    //send query to SQL server
    //sendSearch(query);

    //output search values
    document.getElementById(id).innerHTML = query;
    
}

//add content to a table
const fillTable = function(type, data){
    
    //books displayed like this: <ISBN> <Title> <Author> <Due Date>
    //movies displayed like this: <Title> <Year> <Genre> <Star> <Due Date>
    //albums displayed like this: <Title> <Artist> <Genre> <Release Date> <Due Date> 
    
    if (type === "all"){
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
    
    
    //fill table with data
    if (type === "all"){
        //TODO: add functionality for filling all tables
        
    }else if (type === "books"){
    
        var numResults = data.resultCount;
        var newRow, newCell, newData;
        for (let i = 0; i < numResults; i++){
        
            newRow = document.createElement("TR");//create new row
            newCell = document.createElement("TD");//create new cell
            newCell.innerHTML = data.title[i];//add text to first cell
            newRow.appendChild(newCell);//add the new cell to the row

            //repeat all except new row for the rest of the columns
            newCell.innerHTML = data.column_1[i];
            newRow.appendChild(newCell);

            newCell.innerHTML = data.column_2[i];
            newRow.appendChild(newCell);

            newCell.innerHTML = data.column_3[i];
            newRow.appendChild(newCell);
            node.appendChild(textnode);
            searchBy.appendChild(node);
        }
    }else if (type === "movies")
        
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
            for (let i = 0; i < bookAttributes.length; i++){
                node = document.createElement("OPTION");
                node.innerHTML = bookAttributes[i];
                searchBy.appendChild(node);
            }
            break;
        }
        case "Movie":{
            for (let i = 0; i < movieAttributes.length; i++){
                node = document.createElement("OPTION");
                node.innerHTML = movieAttributes[i];
                searchBy.appendChild(node);
            }
            break;
        }
        case "Album":{
            for (let i = 0; i < albumAttributes.length; i++){
                node = document.createElement("OPTION");
                node.innerHTML = albumAttributes[i];
                searchBy.appendChild(node);
            }
            break;
        }
        case "Card":{
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
        
    }
}


const sendSearch = function(){
    var xhr = new XMLHttpRequest();
    // the /search is the url you're getting from, relative to the site
    var url = "https://jsonplaceholder.typicode.com/posts";
    
    xhr.open("GET", url, true);
    xhr.responseType = "json";
    
    xhr.send();

    xhr.onreadystatechange = function(){

        //readyState 4 means that the request is done
        if(xhr.readyState == 4){
            //deal with the data according to what was searched for
            var searchingFor = document.getElementById("searchFOR").value;
            var json = xhr.response;

            switch (searchingFor){
                case "books":
                    fillTable("books", json);
                    break;
                case "movies":
                    fillTable("movies", json);
                    break;
                case "albums":
                    fillTable("albums", json);
                    break;
                case "all":
                    fillTable("all", json);
                    break;
                case "card":
                    fillTable("all", json);
                    break;
            }
            console.log(json);
        }
    };
}

