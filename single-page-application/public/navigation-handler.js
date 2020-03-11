
document.addEventListener("DOMContentLoaded", function(){
    moveToPage(location.pathname)
    const destinationAnchors = document.getElementsByTagName("a")
    for (anchor of destinationAnchors) {
        anchor.addEventListener("click", function(event) {
            event.preventDefault()
            moveToPage(event.target.getAttribute("href"))
        })
    }
})

const pageLocations = [
    {uri: "/", method: displayHomePage},
    {uri: "/account/signin", method: displaySignInPage},
    {uri: "/account/signup", method: displayHomePage},
    {uri: "/account/view", method: displayHomePage},
]

function moveToPage(uri){
    history.pushState({}, "", uri)

    const currentPage = document.getElementsByClassName("current-page")[0]
    if(currentPage){
        currentPage.classList.remove("current-page")
    }
    
    const destinationIndex = pageLocations.findIndex((element) => element.uri == uri)
    const parentElement = document.getElementById(pageLocations[destinationIndex].uri)
    parentElement.classList.add("current-page")
    pageLocations[destinationIndex].method(parentElement)
}