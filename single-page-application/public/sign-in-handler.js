function signInToAccount(parentElement){
    const apiUrl = "http://localhost:8080/api/account/tokens"
    const loginForm = document.querySelector("#signin")
    
    loginForm.addEventListener("submit",function(event){
        event.preventDefault()

        const username = event.srcElement.elements[0].value
        const password = event.srcElement.elements[1].value

        fetch(apiUrl, {
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
        })
        .catch(error => {
            console.log(error)
        })
    })
}

function login(accessToken){
    localStorage.accessToken = accessToken
    document.body.classList.remove("isLoggedOut")
    document.body.classList.add("isLoggedIn")
}