let authorListDiv = document.getElementById("author-list");
let authorBookListDiv = document.getElementById("author-book-list");

let getAuthor = function (authorName) {    
    authorListDiv.innerHTML = "";
    authorBookListDiv.innerHTML = "";
    let apiUrl = 'https://openlibrary.org/search/authors.json?q='+authorName;
    console.log(apiUrl);
    fetch(apiUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
            console.log(data);
            if (data!=null && data.docs.length>0){
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
            }

        });
      } else {
        //document.getElementById("cityName").value="";
      }
    });
  };

  let getAuthorBooks = function(authorKey) {
      console.log(authorKey);
      authorListDiv.innerHTML = "";
      authorBookListDiv.innerHTML = "";
      let apiUrl = 'https://openlibrary.org/authors/'+authorKey+'/works.json';
      console.log(apiUrl);
      fetch(apiUrl).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
              console.log(data);
              console.log(data.entries.length);
              if (data!=null && data.entries.length>0){
                  let newAuthorListEl = document.createElement("ul");
                  
                  for(let i=0;i<data.entries.length;i++){
                      let newlistEle = document.createElement("li");
                      newlistEle.textContent = data.entries[i].title;
                      newlistEle.setAttribute("data-attribute",data.entries[i].key);
                      newlistEle.addEventListener("click",function(event) {
                          event.preventDefault();
                          jumpToBook(event.target.getAttribute("data-attribute"));
                      });
                      newAuthorListEl.appendChild(newlistEle);
                  } 
                  authorBookListDiv.appendChild(newAuthorListEl);
              }
  
          });
        } else {
          //document.getElementById("cityName").value="";
        }
      });
  };

  let jumpToBook = function(bookKey){
      console.log(bookKey);
  }

  getAuthor("Rowling");