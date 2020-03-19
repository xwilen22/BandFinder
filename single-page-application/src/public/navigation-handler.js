const domains = {
    localhost: "http://localhost:8080",
    dockerIp: "http://192.168.99.100:8080"
}
const currentDomain = domains.localhost

document.addEventListener("DOMContentLoaded", function(){
    moveToPage(location.pathname)
    setLoadingPage(true)
    //moveToPage("loading-indicator-page")
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

function moveToPage(uri){
    history.pushState({}, "", uri)
    const alertHolder = document.getElementById("alert-holder")
    alertHolder.innerHTML = ""
    const errorPage = document.getElementById("error-page")
    errorPage.innerHTML = ""
    const currentPage = document.getElementsByClassName("current-page")[0]
    if(currentPage){
        currentPage.classList.remove("current-page")
    }
    
    const staticDestinationIndex = staticPageDestinations.findIndex((element) => element.uri == uri)
    //If URI is "dynamic" i.e. references specific resource
    if (staticDestinationIndex == -1) {
        if(new RegExp("account\/view\/.+").test(uri)) {
            const parentElement = document.getElementById("/account/view/")
            displayUserDetailPageForUsername(parentElement, uri.match("account\/view\/(.+)")[1])
            parentElement.classList.add("current-page")
        }
        else if (new RegExp("account\/edit\/.+").test(uri)) {
            const parentElement = document.getElementById("/account/edit/")
            displayEditPageForUser(parentElement, uri.match("account\/edit\/(.+)")[1])
            parentElement.classList.add("current-page")
        }
        else {
            console.log("Nothing here 404")
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