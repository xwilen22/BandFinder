const domains = {
    localhost: "http://localhost:8080",
    dockerIp: "http://192.168.99.100:8080"
}
const currentDomain = domains.localhost

document.addEventListener("DOMContentLoaded", function(){
    setLoadingPage(true)
    moveTo(location.pathname)
    if(localStorage.accessToken != undefined && localStorage.accessToken.length > 0){
        uiSignedInHelp(localStorage.username)
    }
    else {
        uiSignOutClearLocalStorage()
    }

    const destinationAnchors = document.getElementsByTagName("a")
    for (anchor of destinationAnchors) {
        anchor.addEventListener("click", function(event) {
            event.preventDefault()
            moveTo(event.target.getAttribute("href"))
        })
    }
})

const staticPageDestinations = [
    //Destinations
    {uri: "/", method: displayHomePage, methodOnly: false},
    {uri: "/account/signin", method: displaySignInToAccountPage, methodOnly: false},
    {uri: "/account/signup", method: displaySignUpNewAccountPage, methodOnly: false},
    //Actions
    {uri: "/account/signout", method: signOut, methodOnly: true}
]

window.addEventListener("popstate", function(event) {
    const uri = location.pathname
	moveToPage(uri)
})

function moveTo(uri) {
    history.pushState({}, "", uri)
    moveToPage(uri)
}

function moveToPage(uri){
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
            errorPage.appendChild(getErrorPage("Can't find requested page", 404))
            errorPage.classList.add("current-page")
            setLoadingPage(false)
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