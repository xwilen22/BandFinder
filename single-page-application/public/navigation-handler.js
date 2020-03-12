
document.addEventListener("DOMContentLoaded", function(){
    moveToPage(location.pathname)
    if(localStorage.accessToken){
        UiSignedInHelp()
    }
    else{
        signOut()
    }

    const destinationAnchors = document.getElementsByTagName("a")
    for (anchor of destinationAnchors) {
        anchor.addEventListener("click", function(event) {
            event.preventDefault()
            moveToPage(event.target.getAttribute("href"))
        })
    }
})

const staticPageDestinations = [
    //Destinations
    {uri: "/", method: displayHomePage, methodOnly: false},
    {uri: "/account/signin", method: signInToAccount, methodOnly: false},
    {uri: "/account/signup", method: signUpNewAccount, methodOnly: false},
    //Actions
    {uri: "/account/signout", method: signOut, methodOnly: true}
]
const dynamicPageDestinations = [
    //Regex specific destinations
    {uri: "/account/view/*", method: displayUserDetailPageForUsername, methodOnly: false},
    {uri: "/account/edit/*", method: displayUserDetailPageForUsername, methodOnly: false},
]

function moveToPage(uri){
    history.pushState({}, "", uri)

    const currentPage = document.getElementsByClassName("current-page")[0]
    if(currentPage){
        currentPage.classList.remove("current-page")
    }
    
    const staticDestinationIndex = staticPageDestinations.findIndex((element) => element.uri == uri)

    if (staticDestinationIndex == -1) {
        //If user page
        //const dynamicDestinationIndex = dynamicPageDestinations.find((element) => element.uri.contains())
        if(new RegExp("account\/view\/.+").test(uri)) {
            const parentElement = document.getElementById("/account/view")
            parentElement.classList.add("current-page")
            displayUserDetailPageForUsername(parentElement, uri.match("account\/view\/(.+)")[1])
        }
    }
    else {
        if(staticPageDestinations[staticDestinationIndex].methodOnly == false){
            const parentElement = document.getElementById(staticPageDestinations[staticDestinationIndex].uri)
            parentElement.classList.add("current-page")
            staticPageDestinations[staticDestinationIndex].method(parentElement)
        }
        else{
            staticPageDestinations[staticDestinationIndex].method()
        }
    }
}