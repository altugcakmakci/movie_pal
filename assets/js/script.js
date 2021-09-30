
let bookInput = $('#btnContainer');
let searchInput = $("#stacked-search")
let alertModal = $("#alert-modal");
let modalSpan = $(".close");



let searchBtnMovie =document.getElementById('movie-button');
let searchMovie= document.getElementById('search-movie');

function searchForMovie(){
    // checks for valid search parameters
    if (!searchMovie.value || /^\s*$/.test(searchMovie.value)){
        console.log("invalid, search cannot be empty");
        //display modal
        alertModal.css("display", "block");  
       
    }
    else{
        console.log("fetch movie");
        getMoviesList(searchMovie.value);

    }
}



modalSpan.on("click", function(event) {
    event.preventDefault();
    console.log(modalSpan)
    alertModal.css("display", "none");
 })


 //place holders, delete on merge
function getMoviesList(search){
    console.log("API call for movies: "+search);
}



searchBtnMovie.addEventListener('click',function(){
    console.log("button clicked");
    searchForMovie();
});








