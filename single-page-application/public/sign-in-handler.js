function signInToAccount(parentElement){
    const apiUrl = {
        localhost: "http://localhost:8080/api/account/tokens",
        dockerIp: "http://192.168.99.100:8080/api/account/tokens"
    }
    const loginForm = document.querySelector("#signin")
    
    loginForm.addEventListener("submit",function(event){
        event.preventDefault()

        const username = event.srcElement.elements[0].value
        const password = event.srcElement.elements[1].value

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
            login(body.access_token)
            moveToPage(`/account/view/${username}`)
        })
        .catch(error => {
            console.log(error)
        })
    })
}
function logout(accesstoken){
    localStorage.accessToken = ""
	document.body.classList.remove("isLoggedIn")
	document.body.classList.add("isLoggedOut")
}
function login(accessToken){
    localStorage.accessToken = accessToken
    document.body.classList.remove("isLoggedOut")
    document.body.classList.add("isLoggedIn")
}