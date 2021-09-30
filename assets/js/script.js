let bookInput = $('#btnContainer');
let searchInput = $("#stacked-search")
let alertModal = $("#alert-modal");
let modalSpan = $(".close");


bookInput.on("click",function(event){ 
    event.preventDefault();
    console.log(searchInput.val());
    if (searchInput.val() != ""); {
        alertModal.css("display", "block");
    }   
})

modalSpan.on("click", function(event) {
    event.preventDefault();
    console.log(modalSpan)
    alertModal.css("display", "none");
 })
