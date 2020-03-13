function signInToAccount(parentElement){
    const loginForm = document.querySelector("#signin")
    
    loginForm.addEventListener("submit",function(event){
        event.preventDefault()

        const username = event.srcElement.elements[0].value
        const password = event.srcElement.elements[1].value

        signIn(username, password, function(error, username) {
            if(error) {
                console.log("FEL HÄR ERROR ", error)
                signOut()
            }
            else {
                UiSignedInHelp()
                moveToPage(`/account/view/${username}`)
            }
        })
    })
}
function signOut(){
    localStorage.accessToken = ""
    localStorage.username = ""
	document.body.classList.remove("showIfSignedIn")
	document.body.classList.add("showIfSingedOut")
}

function UiSignedInHelp(){
    const accountAnchor = document.querySelector("#account")
    accountAnchor.href = `/account/view/${localStorage.username}`
    accountAnchor.innerText = localStorage.username
    document.body.classList.remove("showIfSingedOut")
    document.body.classList.add("showIfSignedIn")
}

function signIn(username, password, callback){
    fetch(`${currentDomain}/api/account/tokens`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `grant_type=password&username=${username}&password=${password}`
    })
    .then(response => {
        if(response.status==201){
            response.json()
            .then(body => {
                console.log(body)
                localStorage.accessToken = body.access_token
                localStorage.username = username
                callback(undefined, username)
            }) 
            .catch(error => {
                callback(error)
            })
        }
        else{
            callback(["Unexpected result"])
        }
    })
}