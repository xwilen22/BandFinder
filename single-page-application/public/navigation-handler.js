
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

const staticPageLocations = [
    {uri: "/", method: displayHomePage},
    {uri: "/account/signin", method: signInToAccount},
    {uri: "/account/signup", method: signUpNewAccount}
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
        const parentElement = document.getElementById(staticPageLocations[destinationIndex].uri)
        parentElement.classList.add("current-page")
        staticPageLocations[destinationIndex].method(parentElement)
    }
}