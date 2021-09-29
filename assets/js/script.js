let bookInput = $('#search-book').value;
let authorInput = $('#search-author').value;
let movieInput = $('#search-movie').value;
let alertModal = document.getElementById("alert-modal");
let modalSpan = document.getElementsByClassName("close")[0];


$(".book-btn").on("click",function(event){ 
    event.preventDefault();
    console.log(alertModal.childElementCount)
    if (bookInput != ""); {
        // alertModal.
        // append("<p>").value = "Book Search Cannot be Empty!"
        alertModal.style.display = "block";
    }   

})
$(".author-btn").on("click",function(event){ 
    event.preventDefault();
    if (authorInput != ""); {
        alert(authorInput)
        alertModal.append("Boo Error");
    }   

})
$(".movie-btn").on("click",function(event){ 
    event.preventDefault();
    console.log("movie button click")
    if (movieInput != ""); {
        alert(movieInput)
        alertModal.append("Boo Error");
    }   

})
modalSpan.onclick = function(event) {
    event.preventDefault();
    alertModal.style.display = "none";
}
window.onclick = function(event) {
    event.preventDefault();
    if (event.target == alertModal) {
      alertModal.style.display = "none";
    }
  }