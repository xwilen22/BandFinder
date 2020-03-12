function signInToAccount(parentElement){
    const loginForm = document.querySelector("#signin")
    
    loginForm.addEventListener("submit",function(event){
        event.preventDefault()

        const username = event.srcElement.elements[0].value
        const password = event.srcElement.elements[1].value

        login(username, password, function(error, username) {
            if(error) {
                console.log("ERROR ", error)
            }
            else {
                moveToPage(`/account/view/${username}`)
            }
        })
    })
}

function logout(){
    //localStorage.accessToken = ""
    localStorage.removeItem("accessToken")
	document.body.classList.remove("isLoggedIn")
	document.body.classList.add("isLoggedOut")
}

function login(username, password, callback){
    const apiUrl = {
        localhost: "http://localhost:8080/api/account/tokens",
        dockerIp: "http://192.168.99.100:8080/api/account/tokens"
    }

    fetch(apiUrl.localhost, {
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
        document.body.classList.remove("isLoggedOut")
        document.body.classList.add("isLoggedIn")
        callback(undefined, username)
    })
    .catch(error => {
        callback(error)
    })
}