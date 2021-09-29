let bookInfoDivEl = document.getElementById("book-info");

let getBook = function (bookKey) {    
    bookInfoDivEl.innerHTML = "";

    let apiUrl = 'https://openlibrary.org'+bookKey+'.json';
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

  getBook('/works/OL25292830W');