let searchBtnMovie =document.getElementById('movie-button');
let searchMovie= document.getElementById('search-movie');
let searchBtnDirector =document.getElementById('director-button');
let searchDirector= document.getElementById('search-director');

function searchForMovie(){
    // checks for valid search parameters
    if (!searchMovie.value || /^\s*$/.test(searchMovie.value)){
        console.log("invalid, search cannot be empty")
       
    }
    else{
        console.log("fetch movie");
        getMoviesApi(searchMovie.value);

    }
}

function searchForPeople(){
    // checks for valid search parameters
    if (!searchDirector.value || /^\s*$/.test(searchDirector.value)){
        console.log("invalid, search cannot be empty")
       
    }
    else{
        console.log("fetch person");
        getPeopleApi(searchDirector.value);

    }
}

function getMoviesApi(search){

    let requestURL="https://imdb-api.com/en/API/SearchMovie/k_2scekk8u/"
    let newURL= requestURL.concat(search);

    fetch(newURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data){
        console.log(data);
        //parse data here
    });
}


function getPeopleApi(search){

    let requestURL="https://imdb-api.com/en/API/SearchName/k_2scekk8u/"
    let newURL= requestURL.concat(search);

    fetch(newURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data){
        console.log(data);
        //parse data here
    });
}

searchBtnMovie.addEventListener('click',function(){
    console.log("button clicked");
    searchForMovie();
});

searchBtnDirector.addEventListener('click',function(){
    console.log("button clicked");
    searchForPeople();
});