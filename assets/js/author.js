let personListDiv = document.getElementById("person-list");
let personWorksListDiv = document.getElementById("person-works-list");
let personInfoDiv = document.getElementById("person-info");
let directorInput = $('#btnContainer');
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

          for (let i = 0; i < data.d.length; i++) {
            let newlistEle = document.createElement("li");
            newlistEle.textContent = data.d[i].l + " - " + data.d[i].s;
            newlistEle.setAttribute("data-attribute", data.d[i].id);
            newlistEle.classList = "person_list";
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

function getPersonInfo(personId) {
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
          let curImgEl = document.createElement("img");
          curImgEl.setAttribute("src", data.image.url);

          let curdivEl = document.createElement("div");
          let newPEl = document.createElement("p");
          newPEl.textContent = data.name;
          curdivEl.appendChild(newPEl);
          let newBDEl = document.createElement("p");
          newBDEl.textContent = "Birth date: "+data.birthDate;
          curdivEl.appendChild(newBDEl);
          let newBDPEl = document.createElement("p");
          newBDPEl.textContent = "Birth place: "+data.birthPlace;
          curdivEl.appendChild(newBDPEl);

          personInfoDiv.appendChild(curdivEl);
          personInfoDiv.appendChild(curImgEl);

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

getPersonList("Laura Dern");

