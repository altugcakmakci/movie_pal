//let apiKey = "k_03x8mwjd";
let apiKey = "k_aaaaaaaa";
let bookInput = $('#btnContainer');
let searchInput = $("#stacked-search")
let alertModal = $("#alert-modal");
let modalSpan = $(".close");
let movieListDiv = document.getElementById("movie-list");
let storedMoviesSeen = [];
let storedMoviesWant = [];

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
    fetch("https://imdb-api.com/en/API/SearchTitle/" + apiKey + "/" + queryString).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                if (data != null && data.results.length > 0) {
                    let newMovieListEl = document.createElement("ul");
                    newMovieListEl.classList = "person-list";

                    for (let i = 0; i < data.results.length; i++) {
                        let newlistEle = document.createElement("li");
                        newlistEle.textContent = data.results[i].title + " " + data.results[i].description;
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

function fillMovieInfoTab(data) {
    movieListDiv.innerHTML = "";
    focusedInfoDiv.innerHTML = "";
    let curContainerEl = document.createElement("div");
    curContainerEl.classList = "pure-g";
    let imgDivEl = document.createElement("div");
    imgDivEl.classList = "pure-u-1-4";

    let curImgEl = document.createElement("img");
    curImgEl.setAttribute("src", data.image);
    curImgEl.classList = "person-image";
    imgDivEl.appendChild(curImgEl);
    curContainerEl.appendChild(imgDivEl);

    let curdivEl = document.createElement("div");
    curdivEl.classList = "pure-u-3-4";
    let newPEl = document.createElement("h3");
    newPEl.textContent = data.fullTitle;
    newPEl.classList = "person-header";
    curdivEl.appendChild(newPEl);
    if (data.directors !== undefined) {
        let newRNEl = document.createElement("p");
        newRNEl.textContent = "Directed by " + data.directors;
        newRNEl.classList = "person-text";
        curdivEl.appendChild(newRNEl);
    }
    if (data.runtimeStr !== undefined) {
        let newBDEl = document.createElement("p");
        newBDEl.textContent = "Running time: " + data.runtimeStr;
        newBDEl.classList = "person-text";
        curdivEl.appendChild(newBDEl);
    }

    let rbContEl = document.createElement("div");
    rbContEl.classList = "container";
    let radioDivEl = document.createElement("div");
    radioDivEl.classList = "radio";
    let radioInpEl = document.createElement("input");
    radioInpEl.setAttribute("id", "first");
    radioInpEl.setAttribute("type", "radio");
    radioInpEl.setAttribute("name", "numbers");
    radioInpEl.setAttribute("value", "first");
    radioInpEl.classList = "radio-seen";
    radioInpEl.setAttribute("data-attribute", data.fullTitle);
    radioInpEl.addEventListener("click", function (event) {
        addMovieSeen(event.target.getAttribute("data-attribute"));
    })
    radioDivEl.appendChild(radioInpEl);

    let radioLabEl = document.createElement("label");
    radioLabEl.setAttribute("for", "first");
    radioLabEl.textContent = "Seen";
    radioLabEl.classList = "radio-seen";
    radioDivEl.appendChild(radioLabEl);

    radioInpEl = document.createElement("input");
    radioInpEl.setAttribute("id", "second");
    radioInpEl.setAttribute("type", "radio");
    radioInpEl.setAttribute("name", "numbers");
    radioInpEl.setAttribute("value", "second");
    radioInpEl.classList = "radio-seen";
    radioInpEl.setAttribute("data-attribute", data.fullTitle);
    radioInpEl.addEventListener("click", function (event) {
        addMovieWant(event.target.getAttribute("data-attribute"));
    })
    radioDivEl.appendChild(radioInpEl);

    radioLabEl = document.createElement("label");
    radioLabEl.setAttribute("for", "second");
    radioLabEl.textContent = "Want to see";
    radioLabEl.classList = "radio-seen";
    radioDivEl.appendChild(radioLabEl);

    radioInpEl = document.createElement("input");
    radioInpEl.setAttribute("id", "third");
    radioInpEl.setAttribute("type", "radio");
    radioInpEl.setAttribute("name", "numbers");
    radioInpEl.setAttribute("value", "third");
    radioInpEl.classList = "radio-seen";
    radioInpEl.setAttribute("data-attribute", data.fullTitle);
    radioInpEl.addEventListener("click", function (event) {
        removeMovie(event.target.getAttribute("data-attribute"));
    })
    radioDivEl.appendChild(radioInpEl);

    radioLabEl = document.createElement("label");
    radioLabEl.setAttribute("for", "third");
    radioLabEl.textContent = "Not interested";
    radioLabEl.classList = "radio-seen";
    radioDivEl.appendChild(radioLabEl);

    rbContEl.appendChild(radioDivEl);

    curdivEl.appendChild(rbContEl);

    if (data.plot !== undefined && data.plot.length > 0) {
        let newPlotEl = document.createElement("p");
        newPlotEl.textContent = data.plot;
        newPlotEl.classList = "person-text";
        curdivEl.appendChild(newPlotEl);
    }
    curContainerEl.appendChild(curdivEl);

    focusedInfoDiv.appendChild(curContainerEl);

    for (let i = 0; i < data.actorList.length; i++) {
        addCastDiv(data.actorList[i]);
    }
}

function addCastDiv(dataCast) {

    console.log(dataCast);
    let kfDivEl = document.createElement("div");
    kfDivEl.classList = "pure-u-1-4";

    let kfImgEl = document.createElement("img");
    kfImgEl.setAttribute("src", dataCast.image);
    kfImgEl.classList = "person-image";
    kfImgEl.setAttribute("data-attribute", dataCast.id);
    kfImgEl.addEventListener("click", function (event) {
        event.preventDefault();
        jumpToPerson(event.target.getAttribute("data-attribute"));
    });
    let kfPEl = document.createElement("p");
    kfPEl.textContent = dataCast.name + " as " + dataCast.asCharacter;
    kfPEl.classList = "movie-text";
    kfPEl.setAttribute("data-attribute", dataCast.id);
    kfPEl.classList = "person_list-item";
    kfPEl.addEventListener("click", function (event) {
        event.preventDefault();
        jumpToPerson(event.target.getAttribute("data-attribute"));
    });
    kfDivEl.appendChild(kfImgEl);
    kfDivEl.appendChild(kfPEl);

    castInfoDiv.appendChild(kfDivEl);
}

function getMovieInfo(movieId) {

    focusedInfoDiv.innerHTML = "";

    fetch("https://imdb-api.com/en/API/Title/" + apiKey + "/" + movieId).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                fillMovieInfoTab(data);

            });
        }
    })
        .catch(err => {
            console.error(err);
        });
}

let jumpToPerson = function (personKey) {
    console.log(personKey);
    document.location.replace("./author.html?id=" + personKey);
}

function checkInputParameter() {
    console.log(location.search);
    if (location.search.length === 0) {
        console.log("return");
        return;
    }
    let parameters = location.search.substring(1).split("&");
    if (parameters === undefined || parameters === null || parameters.length === 0) {
        console.log("return");
        return;
    }
    console.log(parameters);
    console.log(parameters[0].substring(1).split("=")[1]);
    if (parameters[0].substring(1).split("=")[1] !== null) {
        getMovieInfo(parameters[0].substring(1).split("=")[1]);
    }
}

function addMovieSeen(movieName) {
    if (storedMoviesSeen == null) {
        storedMoviesSeen = [movieName];
    } else {
        if (storedMoviesSeen.includes(movieName)) {
            return;
        } else {
            storedMoviesSeen.push(movieName);
        }
    }
    localStorage.setItem("Movies-Seen", JSON.stringify(storedMoviesSeen));
    if (storedMoviesWant == null || storedMoviesWant.length === 0) {
        return;
    }
    if (storedMoviesWant.includes(movieName)) {
        for (let i = 0; i < storedMoviesWant.length; i++) {
            if (storedMoviesWant[i] === movieName) {
                storedMoviesWant.splice(i, 1);
            }
        }
    }
    localStorage.setItem("Movies-Want", JSON.stringify(storedMoviesWant));
}



function addMovieWant(movieName) {
    if (storedMoviesWant == null) {
        storedMoviesWant = [movieName];
    } else {
        if (storedMoviesWant.includes(movieName)) {
            return;
        } else {
            storedMoviesWant.push(movieName);
        }
    }
    if (storedMoviesSeen == null || storedMoviesSeen.length === 0) {
        return;
    }
    localStorage.setItem("Movies-Want", JSON.stringify(storedMoviesWant));
    if (storedMoviesSeen.includes(movieName)) {
        for (let i = 0; i < storedMoviesSeen.length; i++) {
            if (storedMoviesSeen[i] === movieName) {
                storedMoviesSeen.splice(i, 1);
            }
        }
    }
    localStorage.setItem("Movies-Seen", JSON.stringify(storedMoviesSeen));
}

function removeMovie(movieName) {
    if (storedMoviesSeen !== null && storedMoviesSeen.length > 0) {
        localStorage.setItem("Movies-Want", JSON.stringify(storedMoviesWant));
        if (storedMoviesSeen.includes(movieName)) {
            for (let i = 0; i < storedMoviesSeen.length; i++) {
                if (storedMoviesSeen[i] === movieName) {
                    storedMoviesSeen.splice(i, 1);
                }
            }
        }
        localStorage.setItem("Movies-Seen", JSON.stringify(storedMoviesSeen));
    }
    if (storedMoviesWant !== null && storedMoviesSeen.length > 0) {
        localStorage.setItem("Movies-Want", JSON.stringify(storedMoviesWant));
        if (storedMoviesWant.includes(movieName)) {
            for (let i = 0; i < storedMoviesWant.length; i++) {
                if (storedMoviesWant[i] === movieName) {
                    storedMoviesWant.splice(i, 1);
                }
            }
        }
        localStorage.setItem("Movies-Want", JSON.stringify(storedMoviesWant));
    }

}

checkInputParameter();

