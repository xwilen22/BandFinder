
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

const staticPageLocations = [
    {uri: "/", method: displayHomePage, methodOnly: false},
    {uri: "/account/signin", method: signInToAccount, methodOnly: false},
    {uri: "/account/signup", method: signUpNewAccount, methodOnly: false},
    {uri: "/account/signout", method: signOut, methodOnly: true}
]

function moveToPage(uri){
    history.pushState({}, "", uri)

    const currentPage = document.getElementsByClassName("current-page")[0]
    if(currentPage){
        currentPage.classList.remove("current-page")
    }
    
    const destinationIndex = staticPageLocations.findIndex((element) => element.uri == uri)
    if (destinationIndex == -1) {
        //If user page
        if(new RegExp("account\/view\/.+").test(uri)) {
            const parentElement = document.getElementById("/account/view")
            parentElement.classList.add("current-page")
            displayUserDetailPageForUsername(parentElement, uri.match("account\/view\/(.+)")[1])
        }
    }
    else {
        if(staticPageLocations[destinationIndex].methodOnly == false){
            const parentElement = document.getElementById(staticPageLocations[destinationIndex].uri)
            parentElement.classList.add("current-page")
            staticPageLocations[destinationIndex].method(parentElement)
        }
        else{
            staticPageLocations[destinationIndex].method()
        }
    }
}