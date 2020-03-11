document.addEventListener("DOMContentLoaded", function(){
    moveToPage(location.pathname)
})

const pageLocations = [
    "/",
    "/account/signin",
    "/account/signup",
    "/account/view"
]

function moveToPage(url){
    const currentPage = document.getElementsByClassName("current-page")[0]
    if(currentPage){
        currentPage.classList.remove("current-page")
    }
    const destinationIndex = pageLocations.findIndex((element) => element == url)
    document.getElementById(pageLocations[destinationIndex]).classList.add("current-page")
}