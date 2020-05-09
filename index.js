function my_function(){

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
