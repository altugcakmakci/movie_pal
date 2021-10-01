
let bookInput = $('#btnContainer');
let searchInput = $("#stacked-search")
let alertModal = $("#alert-modal");
let modalSpan = $(".close");

let searchBtnMovie =document.getElementById('movie-button');
let searchMovie= document.getElementById('search-movie');
let relatedMediaDiv= document.getElementById('relatedMedia');


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


bookInput.on("click", function (event) {
    event.preventDefault();
    console.log(searchInput.val());
    if (searchInput.val() == "") {
        alertModal.css("display", "block");
    } else {
        alertModal.css("display", "none");
    }
})

modalSpan.on("click", function (event) {
    event.preventDefault();
    console.log(modalSpan)
    alertModal.css("display", "none");

})

function additionalInfoMovie(){
    //relatedMediaDiv="";
    //related books
    //trimspaces
    //let queryStringBook= movieTitle.trim().replace(" ","%20");
 
}
function relatedWiki(){

}
function relatedBooks(){
        let queryStringBook="harry potter and the philosohper's stone";
        fetch("https://www.googleapis.com/books/v1/volumes?q="+queryStringBook)
       .then(function (response){ 
            if (response.ok){
            response.json().then(function (data){
                console.log(data);
                generateRelatedBooks(data);
            })
        }
        else{
            
        }
    });
}
function generateRelatedBooks(data){
    relatedMediaDiv.innerHTML=""
    relatedMediaButtons();
    let bookDiv=document.createElement('div');
    for (i=0; i<4; i++){
        console.log(data.items[i].volumeInfo.title);
        console.log(data.items[i].volumeInfo.authors);
        console.log(data.items[i].volumeInfo.averageRating);
        console.log(data.items[i].volumeInfo.imageLinks.thumbnail);

        //dynamically add books
        let bookCard=document.createElement('div');
        bookCard.setAttribute("class","book-card");

        
        //thumbnail
        let bookThumbnail= document.createElement('img');
        bookThumbnail.setAttribute("src",data.items[i].volumeInfo.imageLinks.thumbnail);
        bookCard.appendChild(bookThumbnail);
       
        //title
        let bookTitle=document.createElement('h3');
        bookTitle.textContent=data.items[i].volumeInfo.title;
        bookCard.appendChild(bookTitle);

        //Author
        let bookAuthors=document.createElement('p');
        let authorName=data.items[i].volumeInfo.authors[0];
        bookAuthors.textContent=authorName;
        bookCard.appendChild(bookAuthors);

        //Book Rating
        let bookRating= document.createElement('p');
        bookRating.textContent="Rating: "+data.items[i].volumeInfo.averageRating;
        bookCard.appendChild(bookRating);
        bookCard.setAttribute('class','bookCard')
        //append
        bookDiv.appendChild(bookCard);
       
       
    }
    relatedMediaDiv.appendChild(bookDiv);

}
function relatedRedditPosts(){
    //top reddit posts
    //trimspaces
    //let queryStringReddit= movieTitle.trim().replace(" ","_");
    let queryStringReddit='harrypotter'
    fetch("https://www.reddit.com/r/" +queryStringReddit+"/top.json?count=20")
    .then(function (response){
        if (response.ok){
            response.json().then(function (data){
                console.log(data);
                generateRedditPosts(data);
            })
        }
        else{
            
        }
    });
}

function generateRedditPosts(data){
    relatedMediaDiv.innerHTML=""
    relatedMediaButtons();
    //only display text post discussions
    for (i=0; i<data.data.children.length;i++){
        if (data.data.children[i].data.selftext==""){
            console.log("no text");
            //display nothing if there is no text in post
        }
        else{
         console.log("header"+data.data.children[i].data.title);
         console.log("text= "+data.data.children[i].data.selftext_html);
         // dynamically add elements data to the related media div
     
         let postDiv=document.createElement('div');
         
         let redditHeader=document.createElement('h3');
         redditHeader.textContent= data.data.children[i].data.title;
         redditHeader.classList='movie-list';   //CHANGE STYLE LATER
        postDiv.appendChild(redditHeader);

         let redditText =document.createElement('p');
         redditText.textContent=data.data.children[i].data.selftext;
         redditText.classList='movie-name';     //CHANGE STYLE LATER
         postDiv.appendChild(redditText);

         relatedMediaDiv.appendChild(postDiv);

        }
    }
    relatedMediaDiv.setAttribute('style','overflow: scroll')
}


function relatedMediaButtons(){
    relatedMediaDiv.innerHTML="";
    let buttonDiv= document.createElement('div');
    let booksButton=document.createElement('button');
    booksButton.textContent="Related Books";
    booksButton.addEventListener('click',function(){
        relatedBooks();
    });
    buttonDiv.appendChild(booksButton);
    let redditButton = document.createElement('button');
    redditButton.textContent="Reddit Discussion";
    redditButton.addEventListener('click', function(){
        relatedRedditPosts();
    });
    buttonDiv.appendChild(redditButton);

    relatedMediaDiv.appendChild(buttonDiv);
}

relatedMediaButtons();

//relatedBooks();
//relatedRedditPosts();
