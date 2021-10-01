let bookInfoDivEl = document.getElementById("book-info");
let collectInput = $('#btnContainer');
let searchInput = $("#stacked-search");
let alertModal = $("#alert-modal");
let modalSpan = $(".close");
let listedMovie = $(".pure-g");

let movieSeen = $("#movies-seen");
let seenMovies = [];
let movieToSee = $("#movies-tosee");
let toSeeMovies = [];
let localData = "";
let movieToAdd = "";

function getSeen() {
  localData = localStorage.getItem("Movies-Seen");
  seenMovies = JSON.parse(localData);
  $(seenMovies).each(function (i) {
    let currentValue = seenMovies[i];
    movieSeen.append('<li>' + currentValue + '</li>');

  })
}
function getToSee() {

  localData = "";
  localData = localStorage.getItem("Movies-Want");
  toSeeMovies = JSON.parse(localData);
  $(toSeeMovies).each(function (i) {
    let newValue = toSeeMovies[i];
    movieToSee.append('<li>' + newValue + '</li>');
  })
}
let getBook = function (bookKey) {
  bookInfoDivEl.innerHTML = "";

  let apiUrl = 'https://openlibrary.org' + bookKey + '.json';
  console.log(apiUrl);
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        /* if (data!=null && data.docs.length>0){
             let newAuthorListEl = document.createElement("ul");
             
             for(let i=0;i<data.docs.length;i++){
                 let newlistEle = document.createElement("li");
                 newlistEle.textContent = data.docs[i].name;
                 newlistEle.setAttribute("data-attribute",data.docs[i].key);
                 newlistEle.classList = "author_list";
                 newlistEle.addEventListener("click",function(event) {
                     event.preventDefault();
                     getAuthorBooks(event.target.getAttribute("data-attribute"));
                 });
                 newAuthorListEl.appendChild(newlistEle);
             }
             authorListDiv.appendChild(newAuthorListEl);
         }*/

      });
    } else {
      //document.getElementById("cityName").value="";
    }
  });
};

collectInput.on("click", function (event) {
  event.preventDefault();
  if (searchInput.val() == "") {
    alertModal.css("display", "block");
  } else {
    alertModal.css("display", "none");
    movieToSee.append('<li>' + searchInput.val() + '</li>');
    toSeeMovies.push(searchInput.val());
    localStorage.setItem("tosee", JSON.stringify(toSeeMovies));
    searchInput.val("");
  };
});

modalSpan.on("click", function (event) {
  event.preventDefault();
  alertModal.css("display", "none");
})


getSeen();
getToSee();
(listedMovie).on("click",function (event) {
  event.preventDefault();
  
})

//getBook('/works/OL25292830W');