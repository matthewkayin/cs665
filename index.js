//5/9/2020




const changeElem = function(id){
    //get value
    var query = document.getElementById("results").value;
    
    //send query to SQL server
    //sendSearch(query);

    //output search values
    document.getElementById(id).innerHTML = query;
    
}

//figure out how to add cells/content to a table
const testBooks = function(){
    //books displayed like this: <Title> <Author> <ISBN>
    //movies displayed like this: <Title> <Year> <Star> <Genre>
    //albums displayed like this: <Title> <Artist> <Release Date> <Genre>
    var table = document.getElementById("books");

    while (table.secondChild){
        table.removeChild(table.lastChild);
    }

    console.log("hi");


    
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
            document.getElementById("results").disabled = false;
            for (let i = 0; i < bookAttributes.length; i++){
                node = document.createElement("OPTION");
                textnode = document.createTextNode(bookAttributes[i]);
                node.appendChild(textnode);
                searchBy.appendChild(node);
            }
            break;
        }
        case "Movie":{
            document.getElementById("results").disabled = false;
            for (let i = 0; i < movieAttributes.length; i++){
                node = document.createElement("OPTION");
                textnode = document.createTextNode(movieAttributes[i]);
                node.appendChild(textnode);
                searchBy.appendChild(node);
            }
            break;
        }
        case "Album":{
            document.getElementById("results").disabled = false;
            for (let i = 0; i < albumAttributes.length; i++){
                node = document.createElement("OPTION");
                textnode = document.createTextNode(albumAttributes[i]);
                node.appendChild(textnode);
                searchBy.appendChild(node);
            }
            break;
        }
        case "Card":{
            document.getElementById("results").disabled = false;
            for (let i = 0; i < cardAttributes.length; i++){
                node = document.createElement("OPTION");
                textnode = document.createTextNode(cardAttributes[i]);
                node.appendChild(textnode);
                searchBy.appendChild(node);
            }
            break;
        }
        case "All":
            node = document.createElement("OPTION");
            textnode = document.createTextNode("Title");
            node.appendChild(textnode);
            searchBy.appendChild(node);
            document.getElementById("results").disabled = true;
    }
}


const sendSearch = function(query){
    var xhr = new XMLHttpRequest();
    // the /search is the url you're getting from, relative to the site
    xhr.open("GET", "/search", true);
    xhr.responseType = "json";
    xhr.onreadystatechange = function(){

        //readyState 4 means that the reuqest is done
        if(xhr.readyState == 4){

            var my_variable = xhr.response.json_variable;
        }
    };
    xhr.send();
}

