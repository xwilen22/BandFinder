function signInToAccount(parentElement){
    const loginForm = document.querySelector("#signin")
    
    loginForm.addEventListener("submit",function(event){
        event.preventDefault()

        const username = event.srcElement.elements[0].value
        const password = event.srcElement.elements[1].value

        signIn(username, password, function(error, username) {
            if(error) {
                console.log("ERROR ", error)
            }
            else {
                const accountAnchor = document.querySelector("#account")
                accountAnchor.href = `/account/view/${username}`
                accountAnchor.innerText = username
                moveToPage(`/account/view/${username}`)
            }
        })
    })
}
function signOut(){
    localStorage.accessToken = ""
	document.body.classList.remove("showIfSignedIn")
	document.body.classList.add("showIfSingedOut")
}

function UiSignedInHelp(){
    document.body.classList.remove("showIfSingedOut")
    document.body.classList.add("showIfSignedIn")
}

function signIn(username, password, callback){
    const apiUrl = {
        localhost: "http://localhost:8080/api/account/tokens",
        dockerIp: "http://192.168.99.100:8080/api/account/tokens"
    }

    fetch(apiUrl.dockerIp, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `grant_type=password&username=${username}&password=${password}`
    })
    .then(response => {
        return response.json()
    })
    .then(body => {
        console.log(body)
        localStorage.accessToken = body.access_token
        document.body.classList.remove("showIfSingedOut")
        document.body.classList.add("showIfSignedIn")
        callback(undefined, username)
    })
    .catch(error => {
        callback(error)
    })
}