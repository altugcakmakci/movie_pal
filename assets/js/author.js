let bookInput = $('#btnContainer');
let searchInput = $("#stacked-search")
let alertModal = $("#alert-modal");
let modalSpan = $(".close");



let searchBtnPeople =document.getElementById('people-button');
let searchPeople= document.getElementById('search-people');

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



modalSpan.on("click", function(event) {
    event.preventDefault();
    console.log(modalSpan)
    alertModal.css("display", "none");
 })


 
//place holders, delete on merge
function getPersonList(search){
    console.log("API call for people: "+search);
}

searchBtnPeople.addEventListener('click',function(){
    console.log("button clicked");
    searchForPeople();
});