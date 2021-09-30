
let bookInput = $('#btnContainer');
let searchInput = $("#stacked-search")
let alertModal = $("#alert-modal");
let modalSpan = $(".close");

let searchBtnMovie =document.getElementById('movie-button');
let searchMovie= document.getElementById('search-movie');

let testStr="https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch=shrek_2001"
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



searchBtnMovie.addEventListener('click',function(){
    console.log("button clicked");
    searchForMovie();
});



modalSpan.on("click", function(event) {
    event.preventDefault();
    console.log(modalSpan)
    alertModal.css("display", "none");
 })


function additionalInfoMovie(){

    //top reddit posts
    //let queryString= movieTitle.trim().replace(" ","_");
    let queryString='shrek'
    fetch("https://www.reddit.com/r/" +queryString+"/top.json?count=20")
    .then(function (response){
        if (response.ok){
            response.json().then(function (data){
                console.log(data);
               //only display text post discussions
                for (i=0; i<data.data.children.length;i++){
                   if (data.data.children[i].data.selftext==""){
                       console.log("no text");
                       //display nothing if there is no text in post
                   }
                   else{
                    console.log("header"+data.data.children[i].data.title);
                    console.log("text= "+data.data.children[i].data.selftext);
                    // dynamically add elements data to the related media div
                   }
                
                }
            })
        }
        else{

        }
    });
        
 
}

additionalInfoMovie();