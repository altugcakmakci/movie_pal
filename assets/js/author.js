let personListDiv = document.getElementById("person-list");
let personWorksListDiv = document.getElementById("person-works-list");
let personInfoDiv = document.getElementById("person-info");
let searchButton = document.getElementById("search-button");

function getPersonList(personName) {
  personListDiv.innerHTML = "";
  personWorksListDiv.innerHTML = "";

  let queryString = personName.trim().replace(" ", "%20");

  console.log();
  fetch("https://imdb8.p.rapidapi.com/auto-complete?q=" + queryString, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "imdb8.p.rapidapi.com",
      "x-rapidapi-key": "5b46d45e45mshe1c48dc69c31a27p1a2cbajsn49419ea833ba"
    }
  }).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        if (data != null && data.d.length > 0) {
          let newPersonListEl = document.createElement("ul");
          newPersonListEl.classList = "person-list";

          for (let i = 0; i < data.d.length; i++) {
            let newlistEle = document.createElement("li");
            newlistEle.textContent = data.d[i].l + " - " + data.d[i].s;
            newlistEle.setAttribute("data-attribute", data.d[i].id);
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

function fillTabwithData(data, dataKnown) {
  personInfoDiv.innerHTML = "";
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
  newPEl.textContent = data.name;
  newPEl.classList = "person-header";
  curdivEl.appendChild(newPEl);
  if (data.realName !== undefined) {
    let newRNEl = document.createElement("p");
    newRNEl.textContent = "Real name: " + data.realName;
    newRNEl.classList = "person-text";
    curdivEl.appendChild(newRNEl);
  }
  if (data.birthDate !== undefined) {
    let newBDEl = document.createElement("p");
    newBDEl.textContent = "Birth date: " + data.birthDate;
    newBDEl.classList = "person-text";
    curdivEl.appendChild(newBDEl);
  }
  if (data.birthPlace !== undefined) {
    let newBDPEl = document.createElement("p");
    newBDPEl.textContent = "Birth place: " + data.birthPlace;
    newBDPEl.classList = "person-text";
    curdivEl.appendChild(newBDPEl);
  }

  let newKFEl = document.createElement("p");
  newKFEl.textContent = "Known for" ;
  newKFEl.classList = "person-text";
  curdivEl.appendChild(newKFEl);
  console.log(dataKnown);

  let kfContainerEl = document.createElement("div");
  kfContainerEl.classList = "pure-g";

  for(let i=0;i<dataKnown.length;i++){
    let kfDivEl = document.createElement("div");
    kfDivEl.classList = "pure-u-1-4";

    let kfImgEl = document.createElement("img");
    kfImgEl.setAttribute("src", dataKnown[i].title.image.url);
    kfImgEl.classList = "person-image";
    kfDivEl.appendChild(kfImgEl);
    kfContainerEl.appendChild(kfDivEl);

  }
  curdivEl.appendChild(kfContainerEl);

  curContainerEl.appendChild(curdivEl);

  personInfoDiv.appendChild(curContainerEl);
}

function getPersonInfo(personId) {
  personListDiv.innerHTML = "";
  fetch("https://imdb8.p.rapidapi.com/actors/get-bio?nconst=" + personId, {
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

          fetch("https://imdb8.p.rapidapi.com/actors/get-known-for?nconst=" + personId, {
            "method": "GET",
            "headers": {
              "x-rapidapi-host": "imdb8.p.rapidapi.com",
              "x-rapidapi-key": "5b46d45e45mshe1c48dc69c31a27p1a2cbajsn49419ea833ba"
            }
          })
            .then(response => {
              if (response.ok) {
                response.json().then(function (dataKnown) {
                  fillTabwithData(data, dataKnown)
                });
              }
              console.log(response);
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
            newlistEle.setAttribute("data-attribute", data.entries[i].key);
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
}



searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  let personInput = document.getElementById("stacked-search");
  console.log(personInput.value);
  getPersonList(personInput.value);
  personInput.value = "";
});

