let bookInput = $('#btnContainer');
let searchInput = $("#stacked-search")
let alertModal = $("#alert-modal");
let modalSpan = $(".close");



let searchBtnPeople =$('#people-button');
let searchPeople= $('#search-people');

function searchForPeople(){
    // checks for valid search parameters
    if (!searchPeople.val() || /^\s*$/.test(searchPeople.val())){
        console.log("invalid, search cannot be empty")
        //display modal
        alertModal.css("display", "block");
       
    }
    else{
        console.log("fetch person");
        getPersonList(searchPeople.val());

    }
}



modalSpan.on("click", function(event) {
    event.preventDefault();
    console.log(modalSpan)
    alertModal.css("display", "none");
 })


 
//place holders, delete on merge
function getPersonList(search){
    console.log("API call for people: "+search);
}

searchBtnPeople.on('click',function(){
    console.log("button clicked");
    searchForPeople();
});