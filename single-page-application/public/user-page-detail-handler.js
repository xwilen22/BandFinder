function displayUserDetailPageForUsername(parentElement, username) {
    const usernameHeader = parentElement.getElementsByTagName("h2")[0]
    const bioparagraphElement = parentElement.getElementsByTagName("p")[0]
    const editUserAnchor = parentElement.getElementsByTagName("a")[0]
    
    editUserAnchor.hidden = (decodeURIComponent(username) != localStorage.username)

    fetchResource(`account/${username}`, function(error, accountInformationObject) {
        if(error) {

        }
        else {
            usernameHeader.innerText = accountInformationObject.username
            bioparagraphElement.innerText = accountInformationObject.biography
            editUserAnchor.href = `/account/edit/${accountInformationObject.username}`
        }
    })
}