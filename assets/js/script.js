
let bookInput = $('#btnContainer');
let searchInput = $("#stacked-search")
let alertModal = $("#alert-modal");
let modalSpan = $(".close");
let movieListDiv = document.getElementById("movie-list");

let searchBtnMovie = document.getElementById('movie-button');
let searchMovie = document.getElementById('search-movie');
let focusedInfoDiv = document.getElementById("focusedInfo");
let castInfoDiv = document.getElementById("castInfo");

function searchForMovie() {
    // checks for valid search parameters
    if (!searchMovie.value || /^\s*$/.test(searchMovie.value)) {
        console.log("invalid, search cannot be empty");
        //display modal
        alertModal.css("display", "block");

    }
    else {
        console.log("fetch movie");
        getMoviesList(searchMovie.value);

    }
}



searchBtnMovie.addEventListener('click', function () {
    console.log("button clicked");
    searchForMovie();
});



modalSpan.on("click", function (event) {
    event.preventDefault();
    console.log(modalSpan)
    alertModal.css("display", "none");
})

function getMoviesList(searchTitle) {
    movieListDiv.innerHTML = "";
    focusedInfoDiv.innerHTML = "";

    let queryString = searchTitle.trim().replace(" ", "%20");

    console.log();
    fetch("https://imdb8.p.rapidapi.com/title/find?q=" + queryString, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "imdb8.p.rapidapi.com",
            "x-rapidapi-key": "5b46d45e45mshe1c48dc69c31a27p1a2cbajsn49419ea833ba"
        }
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                if (data != null && data.results.length > 0) {
                    let newMovieListEl = document.createElement("ul");
                    newMovieListEl.classList = "person-list";

                    for (let i = 0; i < data.results.length; i++) {
                        let newlistEle = document.createElement("li");
                        newlistEle.textContent = data.results[i].title + " (" + data.results[i].year + ")";
                        newlistEle.setAttribute("data-attribute", data.results[i].id);
                        newlistEle.classList = "person_list-item";
                        newlistEle.addEventListener("click", function (event) {
                            event.preventDefault();
                            getMovieInfo(event.target.getAttribute("data-attribute"));
                        });
                        newMovieListEl.appendChild(newlistEle);
                    }
                    movieListDiv.appendChild(newMovieListEl);
                }

            });
        } else {
            //document.getElementById("cityName").value="";
        }
    });
}

function fillMovieInfoTab(data,dataPlot) {
    movieListDiv.innerHTML = "";
    focusedInfoDiv.innerHTML = "";
    let curContainerEl = document.createElement("div");
    curContainerEl.classList = "pure-g";
    let imgDivEl = document.createElement("div");
    imgDivEl.classList = "pure-u-1-4";

    let curImgEl = document.createElement("img");
    curImgEl.setAttribute("src", data.image.url);
    curImgEl.classList = "person-image";
    imgDivEl.appendChild(curImgEl);
    curContainerEl.appendChild(imgDivEl);

    let curdivEl = document.createElement("div");
    curdivEl.classList = "pure-u-3-4";
    let newPEl = document.createElement("h3");
    newPEl.textContent = data.title;
    newPEl.classList = "person-header";
    curdivEl.appendChild(newPEl);
    if (data.year !== undefined) {
        let newRNEl = document.createElement("p");
        newRNEl.textContent = "Year: " + data.year;
        newRNEl.classList = "person-text";
        curdivEl.appendChild(newRNEl);
    }
    if (data.year !== undefined) {
        let newBDEl = document.createElement("p");
        newBDEl.textContent = "Running time: " + data.year + " minutes";
        newBDEl.classList = "person-text";
        curdivEl.appendChild(newBDEl);
    }
    if (dataPlot!==null && dataPlot.plots.length>0){
        let newPlotEl = document.createElement("p");
        newPlotEl.textContent = dataPlot.plots[0].text;
        newPlotEl.classList = "person-text";
        curdivEl.appendChild(newPlotEl);
    }
    curContainerEl.appendChild(curdivEl);
    focusedInfoDiv.appendChild(curContainerEl);

    /*    let newKFEl = document.createElement("p");
        newKFEl.textContent = "Known for";
        newKFEl.classList = "person-text movie-list-header";
        curdivEl.appendChild(newKFEl);
        console.log(dataKnown);
      
        let kfContainerEl = document.createElement("div");
        kfContainerEl.classList = "pure-g";
      
        for (let i = 0; i < dataKnown.length; i++) {
          let kfDivEl = document.createElement("div");
          kfDivEl.classList = "pure-u-1-4";
      
          let kfImgEl = document.createElement("img");
          kfImgEl.setAttribute("src", dataKnown[i].title.image.url);
          kfImgEl.classList = "person-image";
          let kfPEl = document.createElement("p");
          kfPEl.textContent = dataKnown[i].title.title;
          kfPEl.classList = "movie-text";
          kfDivEl.appendChild(kfImgEl);
          kfDivEl.appendChild(kfPEl);
          kfContainerEl.appendChild(kfDivEl);
      
        }
        curdivEl.appendChild(kfContainerEl);
      
        curContainerEl.appendChild(curdivEl);
      
        personInfoDiv.appendChild(curContainerEl);
      
        if (dataWorks!=null && dataWorks.filmography!==undefined && dataWorks.filmography.length>0){
          let newWUListEl = document.createElement("ul");
          let newWHeaderEle = document.createElement("li");
          newWHeaderEle.textContent = "Works";
          newWHeaderEle.classList = "movie-list-header";
          newWUListEl.appendChild(newWHeaderEle);
          for (let i = 0; i < dataWorks.filmography.length; i++) {
            if (dataWorks.filmography[i].titleType!=="movie" || dataWorks.filmography[i].year===undefined || dataWorks.filmography[i].id===undefined){
              continue;
            }
            if (dataWorks.filmography[i].category!==undefined && (dataWorks.filmography[i].category==='archive_footage' || dataWorks.filmography[i].category==='self')){
              continue;
            }
            console.log(i);
            console.log(dataWorks.filmography[i]);
            let newWlistEle = document.createElement("li");
            let kWImgEl = document.createElement("img");
            if (dataWorks.filmography[i].image!==undefined){
              kWImgEl.setAttribute("src", dataWorks.filmography[i].image.url);
            }
            
            kWImgEl.classList = "movie-image";
            newWlistEle.appendChild(kWImgEl);
            let pListEl = document.createElement("p");
            pListEl.textContent = dataWorks.filmography[i].title + " ("+dataWorks.filmography[i].year+") "+dataWorks.filmography[i].category;
            pListEl.classList='movie-name';
            newWlistEle.setAttribute("data-attribute", dataWorks.filmography[i].id);
            newWlistEle.classList = "movie-list";
            newWlistEle.appendChild(pListEl);
            newWlistEle.addEventListener("click", function (event) {
              event.preventDefault();
              //jumpToWorks(event.target.getAttribute("data-attribute"));
            });
            
            newWUListEl.appendChild(newWlistEle);
          }
          personWorksListDiv.appendChild(newWUListEl);
        } */


}

function getMovieInfo(movieId) {

    focusedInfoDiv.innerHTML = "";
    console.log(movieId);
    console.log(movieId.split('/'));
    let titleId = movieId.split('/')[2];
    if (titleId === null) {
        return;
    }
    fetch("https://imdb8.p.rapidapi.com/title/get-details?tconst=" + titleId, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "imdb8.p.rapidapi.com",
            "x-rapidapi-key": "5b46d45e45mshe1c48dc69c31a27p1a2cbajsn49419ea833ba"
        }
    })
        .then(response => {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);

                    fetch("https://imdb8.p.rapidapi.com/title/get-plots?tconst="+ titleId, {
                        "method": "GET",
                        "headers": {
                            "x-rapidapi-host": "imdb8.p.rapidapi.com",
                            "x-rapidapi-key": "5b46d45e45mshe1c48dc69c31a27p1a2cbajsn49419ea833ba"
                        
                       }
                    })
                        .then(response => {
                            if (response.ok) {
                                response.json().then(function (dataPlot) {
                                    console.log(dataPlot);
                                    fillMovieInfoTab(data,dataPlot);
                                    
                                });
                            }
                        })
                        .catch(err => {
                            console.error(err);
                        });

                    
                });
            }
        })
        .catch(err => {
            console.error(err);
        });
}

