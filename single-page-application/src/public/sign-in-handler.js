function displaySignInToAccountPage(parentElement){
    const loginForm = document.querySelector("#signin")
    const alertHolder = document.getElementById("alert-holder")
    loginForm.addEventListener("submit",function(event){
        event.preventDefault()
        alertHolder.innerHTML=""
        const username = event.srcElement.elements[0].value
        const password = event.srcElement.elements[1].value

        signIn(username, password, function(error, username) {
            if(error) {
                alertHolder.appendChild(getAlert("Failed to sign in","danger"))
                signOut()
            }
            else {
                UiSignedInHelp(username)
                moveTo(`/account/view/${username}`)
            }
        })
    })
    setLoadingPage(false)
}
function signOut(){
    uiSignOutClearLocalStorage()
    moveTo("/")
}

function uiSignOutClearLocalStorage() {
    localStorage.accessToken = ""
    localStorage.username = ""
    document.body.classList.remove("showIfSignedIn")
    document.body.classList.add("showIfSingedOut")
}

function UiSignedInHelp(username){
    let userId = username
    
    const accountAnchor = document.querySelector("#account")
    accountAnchor.href = `/account/view/${userId}`
    accountAnchor.innerText = username
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