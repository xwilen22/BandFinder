function displayHomePage(parentElement) {
    const userUnOrderedList = parentElement.getElementsByTagName("ul")[0]
    const errorPage = document.getElementById("error-page")
    setLoadingPage(true)
    //Empties list
    userUnOrderedList.innerHTML = ""
    fetchResource(`account` ,function(error, accounts) {
        if(error) {
            parentElement.classList.remove("current-page")
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
        setLoadingPage(false)
    })
}