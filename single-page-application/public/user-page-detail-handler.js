function displayUserDetailPageForUsername(parentElement, username) {
    const usernameHeader = parentElement.getElementsByTagName("h2")[0]
    const bioparagraphElement = parentElement.getElementsByTagName("p")[0]
    const editUserAnchor = parentElement.getElementsByTagName("a")[0]
    
    getUserInformation(username, function(error, accountInformation) {
        if(error) {
            console.log("ERROR", error)
        }
        else {
            usernameHeader.innerText = accountInformation.username
            bioparagraphElement.innerText = accountInformation.biography
            //editUserAnchor.href = `/account/edit/${accountInformation.username}`
            editUserAnchor.href = `/account/edit`
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