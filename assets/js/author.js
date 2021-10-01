
//let apiKey = "k_03x8mwjd";
let apiKey="k_aaaaaaaa";
let personListDiv = document.getElementById("person-list");
let personWorksListDiv = document.getElementById("person-works-list");
let personInfoDiv = document.getElementById("person-info");
let searchButton = document.getElementById("search-button");
let searchBtnPeople = document.getElementById('people-button');
let searchPeople = document.getElementById('search-people');

let bookInput = $('#btnContainer');

let searchInput = $("#stacked-search")
let alertModal = $("#alert-modal");
let modalSpan = $(".close");


directorInput.on("click", function (event) {
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

function searchForPeople(){
    // checks for valid search parameters
    if (!searchPeople.value || /^\s*$/.test(searchPeople.value)){
        console.log("invalid, search cannot be empty")
        //display modal
        alertModal.css("display", "block");
    }
    else{
        console.log("fetch person");
        getPersonList(searchPeople.value);

  }
}

searchBtnPeople.addEventListener('click', function () {
  console.log("button clicked");
  searchForPeople();
});

modalSpan.on("click", function (event) {
  event.preventDefault();
  console.log(modalSpan)
  alertModal.css("display", "none");
})


function getPersonList(personName) {
  personListDiv.innerHTML = "";
  personWorksListDiv.innerHTML = "";
  personInfoDiv.innerHTML = "";

  let queryString = personName.trim().replace(" ", "%20");

  console.log();
  fetch("https://imdb-api.com/en/API/SearchName/" + apiKey + "/" + queryString).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        if (data != null && data.results.length > 0) {
          let newPersonListEl = document.createElement("ul");
          newPersonListEl.classList = "person-list";

          for (let i = 0; i < data.results.length; i++) {
            let newlistEle = document.createElement("li");
            newlistEle.textContent = data.results[i].title + " - " + data.results[i].description;
            newlistEle.setAttribute("data-attribute", data.results[i].id);
            newlistEle.classList = "person_list-item";
            newlistEle.addEventListener("click", function (event) {
              event.preventDefault();
              getPersonInfo(event.target.getAttribute("data-attribute"));
            });
            newPersonListEl.appendChild(newlistEle);
          }
          personListDiv.appendChild(newPersonListEl);
        }

      });
    } else {
      //document.getElementById("cityName").value="";
    }
  });
};

function fillTabwithData(data, dataWorks) {
  personInfoDiv.innerHTML = "";
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
  newPEl.textContent = data.name;
  newPEl.classList = "person-header";
  curdivEl.appendChild(newPEl);
  if (data.role !== undefined) {
    let newRNEl = document.createElement("p");
    newRNEl.textContent = data.role;
    newRNEl.classList = "person-text";
    curdivEl.appendChild(newRNEl);
  }

  if (data.birthDate !== undefined) {
    let newBDEl = document.createElement("p");
    newBDEl.textContent = "Birth date: " + data.birthDate;
    newBDEl.classList = "person-text";
    curdivEl.appendChild(newBDEl);
  }
  if (data.summary !== undefined) {
    let newBDPEl = document.createElement("p");
    newBDPEl.textContent = data.summary;
    newBDPEl.classList = "person-text";
    curdivEl.appendChild(newBDPEl);
  }


  let newKFEl = document.createElement("p");
  newKFEl.textContent = "Known for";
  newKFEl.classList = "person-text movie-list-header";
  curdivEl.appendChild(newKFEl);

  let kfContainerEl = document.createElement("div");
  kfContainerEl.classList = "pure-g";

  for (let i = 0; i < data.knownFor.length && i < 4; i++) {
    console.log("Nilay");
    console.log(data.knownFor[i]);
    let kfDivEl = document.createElement("div");
    kfDivEl.classList = "pure-u-1-4";
    let kfImgEl = document.createElement("img");
    kfImgEl.setAttribute("src", data.knownFor[i].image);
    kfImgEl.classList = "person-image";
    let kfPEl = document.createElement("p");
    kfPEl.textContent = data.knownFor[i].fullTitle;
    kfPEl.classList = "movie-text";
    kfDivEl.appendChild(kfImgEl);
    kfDivEl.appendChild(kfPEl);
    kfContainerEl.appendChild(kfDivEl);
  }

  let newWUListEl = document.createElement("ul");
  let newWHeaderEle = document.createElement("li");
  newWHeaderEle.textContent = "Works";
  newWHeaderEle.classList = "movie-list-header";
  newWUListEl.appendChild(newWHeaderEle);
  for (let i = 0; i < data.castMovies.length; i++) {
    if (data.castMovies[i].role !== undefined && (data.castMovies[i].role === 'archive_footage' || data.castMovies[i].role === 'self')) {
      continue;
    }
    console.log(i);
    console.log(data.castMovies[i]);
    let newWlistEle = document.createElement("li");
    /*let kWImgEl = document.createElement("img");
    if (data.castMovies[i].image !== undefined) {
      kWImgEl.setAttribute("src", data.castMovies[i].image.url);
    }

    kWImgEl.classList = "movie-image";
    newWlistEle.appendChild(kWImgEl); */
    let pListEl = document.createElement("p");
    let titleStr = data.castMovies[i].title;
    console.log(data.castMovies[i].year);
    if (data.castMovies[i].year !== undefined && data.castMovies[i].year !== null && data.castMovies[i].year.length > 0) {
      titleStr = titleStr + " (" + data.castMovies[i].year + ") ";
    } else {
      titleStr = titleStr + " (in production) ";
    }
    titleStr = titleStr + data.castMovies[i].role;
    pListEl.textContent = titleStr;
    pListEl.classList = 'movie-name';
    pListEl.setAttribute("data-attribute", data.castMovies[i].id);
    pListEl.addEventListener("click", function (event) {
      event.preventDefault();
      jumpToWorks(event.target.getAttribute("data-attribute"));
    });
    newWlistEle.classList = "movie-list";
    newWlistEle.appendChild(pListEl);
    newWlistEle.addEventListener("click", function (event) {
      event.preventDefault();
      //jumpToWorks(event.target.getAttribute("data-attribute"));
    });

    newWUListEl.appendChild(newWlistEle);
  }

  curdivEl.appendChild(kfContainerEl);

  curContainerEl.appendChild(curdivEl);

  personInfoDiv.appendChild(curContainerEl);
  personWorksListDiv.appendChild(newWUListEl);

}

function getPersonInfo(personId) {
  personListDiv.innerHTML = "";
  fetch("https://imdb-api.com/en/API/Name/" + apiKey + "/" + personId)
    .then(response => {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          fillTabwithData(data);

        });
      }
    })
    .catch(err => {
      console.error(err);
    });
}

function getPersonWorks(personKey) {
  console.log(personKey);
  personWorksListDiv.innerHTML = "";
  let apiUrl = 'https://openlibrary.org/persons/' + personKey + '/works.json';
  console.log(apiUrl);
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        console.log(data.entries.length);
        if (data != null && data.entries.length > 0) {
          let newPersonListEl = document.createElement("ul");

          for (let i = 0; i < data.entries.length; i++) {
            let newlistEle = document.createElement("li");
            newlistEle.textContent = data.entries[i].title;
            newlistEle.setAttribute("data-attribute", data.entries[i].id);
            newlistEle.addEventListener("click", function (event) {
              event.preventDefault();
              jumpToWorks(event.target.getAttribute("data-attribute"));
            });
            newPersonListEl.appendChild(newlistEle);
          }
          personWorksListDiv.appendChild(newPersonListEl);
        }

      });
    } else {
      //document.getElementById("cityName").value="";
    }
  });
};

let jumpToWorks = function (WorksKey) {
  console.log(WorksKey);
  document.location.replace("./index.html?id=" + WorksKey);
}

function checkInputParameter() {
  console.log(location.search);
  let parameters = location.search.substring(1).split("&");
  if (parameters === null || parameters.length === 0) {
    return;
  }
  console.log(parameters);
  console.log(parameters[0].substring(1).split("=")[1]);
  if (parameters[0].substring(1).split("=")[1] !== null) {
    getPersonInfo(parameters[0].substring(1).split("=")[1]);
  }
}

checkInputParameter();