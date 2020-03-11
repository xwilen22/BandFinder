function displayHomePage(parentElement) {
    const userUnOrderedList = parentElement.getElementsByTagName("ul")[0]
    fetchAllAccounts(function(error, accounts) {
        if(error) {

        }
        else {
            for (account of accounts) {
                const listItem = document.createElement("li")
                listItem.innerText = account.username
                userUnOrderedList.appendChild(listItem)
            }
        }
    })
}
function fetchAllAccounts(callback) {
    fetch(
        "http://localhost:8080/api/account"
    )
    .then(response => {
        return(response.json())
    })
    .then(accounts => {
        console.log("FETCHED STUFF", accounts)
        callback(undefined, accounts)
    })
    .catch(error => {
        console.log("FAILED", error)
        callback(error)
    })
}