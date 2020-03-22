function displayUserDetailPageForUsername(parentElement, username) {
    const usernameHeader = parentElement.getElementsByTagName("h2")[0]
    const bioparagraphElement = parentElement.getElementsByTagName("p")[0]
    const editUserAnchor = parentElement.getElementsByTagName("a")[0]
    const errorPage = document.getElementById("error-page")
    editUserAnchor.hidden = (decodeURIComponent(username) != localStorage.username)

    fetchResource(`account/${username}`, function(error, accountInformationObject) {
        if(error) {
            console.log("Uh oh stinky")
            errorPage.appendChild(getErrorPage("Couldn't fetch the user, sorry about that!", error.status))
        }
        else {
            usernameHeader.innerText = accountInformationObject.username
            bioparagraphElement.innerText = accountInformationObject.biography
            editUserAnchor.href = `/account/edit/${accountInformationObject.username}`
        }
    })
}