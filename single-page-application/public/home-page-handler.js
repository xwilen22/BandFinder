function displayHomePage(parentElement) {
    const userUnOrderedList = parentElement.getElementsByTagName("ul")[0]
    //Empties list
    userUnOrderedList.innerHTML = ""
    fetchAllAccounts(function(error, accounts) {
        if(error) {
            console.log(error)
        }
        else {
            for (account of accounts) {
                const listItem = document.createElement("li")
                const userPageAnchor = document.createElement("a")
                userPageAnchor.addEventListener("click", function(event) {
                    event.preventDefault()
                    moveToPage(event.target.getAttribute("href"))
                })
                userPageAnchor.href = `/account/view/${account.username}`
                userPageAnchor.innerText = account.username

                listItem.append(userPageAnchor)
                userUnOrderedList.appendChild(listItem)
            }
        }
    })
}
function fetchAllAccounts(callback) {
    fetch(
        "http://192.168.99.100:8080/api/account"
    )
    .then(response => {
        if(response.status == 201) {
            return(response.json())
        }
        else {
            callback(["Unexpected result"])
        }
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