function displayUserDetailPageForUsername(parentElement, username) {
    const usernameHeader = parentElement.getElementsByTagName("h2")[0]
    const bioparagraphElement = parentElement.getElementsByTagName("p")[0]
    const editUserAnchor = parentElement.getElementsByTagName("a")[0]
    
    editUserAnchor.hidden = (decodeURIComponent(username) != localStorage.username)

    getUserInformation(username, function(error, accountInformationObject) {
        if(error) {
            console.log("ERROR", error)
        }
        else {
            usernameHeader.innerText = accountInformationObject.username
            bioparagraphElement.innerText = accountInformationObject.biography
            editUserAnchor.href = `/account/edit/${accountInformationObject.username}`
        }
    })
}
function getUserInformation(username, callback) {
    let errorResponseCode = undefined
    
    fetch(
        `${currentDomain}/api/account/${username}`
    ).then(response => {
        if(response.ok) {
            return response.json()
        }
        else {
            errorResponseCode = response.status
        }
    })
    .then(accountInformation => {
        callback(errorResponseCode, accountInformation)
    })
    .catch(error => {
        callback(error)
    })
}