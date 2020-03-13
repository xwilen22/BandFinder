function displayHomePage(parentElement) {
    const userUnOrderedList = parentElement.getElementsByTagName("ul")[0]
    const errorPage = document.getElementById("error-page")
    //Empties list
    userUnOrderedList.innerHTML = ""
    fetchAllAccounts(function(error, accounts) {
        if(error) {
            errorPage.appendChild(getErrorPage("Couldn't fetch the users, sorry about that.",error.status))
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
        `${currentDomain}/api/account`
    )
    .then(response => {
        if(response.status == 201) {
            response.json()
            .then(accounts => {
                console.log("FETCHED STUFF", accounts)
                callback(undefined, accounts)
            })
            .catch(error => {
                console.log("FAILED", error)
                callback(error)
            })
        }
        else {
            callback(["Unexpected result"])
        }
    })
}