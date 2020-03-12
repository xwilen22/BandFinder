function displayUserDetailPageForUsername(parentElement, username) {
    console.log(username)
    parentElement.getElementsByTagName("h2")[0].innerText = username
    const bioparagraphElement = parentElement.getElementsByTagName("p")[0]

    getUserInformation(username, function(error, accountInformation) {
        if(error) {

        }
        else {
            bioparagraphElement.innerText = accountInformation.biography
        }
    })
}
function getUserInformation(username, callback) {
    fetch(
        `http://localhost:8080/api/account/${username}`
    ).then(response => {
        return response.json()
    })
    .then(accountInformation => {
        callback(undefined, accountInformation)
    })
    .catch(error => {
        callback(error)
    })
}