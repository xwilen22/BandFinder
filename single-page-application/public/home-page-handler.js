let accounts = [
    "Asshole",
    "RingusDingus",
    "WankStain1338"
]

function displayHomePage(parentElement) {
    const userUnOrderedList = parentElement.getElementsByTagName("ul")[0]
    for (accountName of accounts) {
        const listItem = document.createElement("li")
        listItem.innerText = accountName
        userUnOrderedList.appendChild(listItem)
    }
}
function fetchAllAccounts() {
    fetch(
        "https://localhost:8080/api/account"
    ).then(response => {
        console.log("FETCHED STUFF", response)
        return response.json()
    })
}