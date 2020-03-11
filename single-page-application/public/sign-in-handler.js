function signInToAccount(parentElement){
    const apiUrl = "http://192.168.99.100:8080/api/tokens"
    const loginForm = document.querySelector("#signin")
    loginForm.addEventListener("submit",function(event){
        event.preventDefault()

        const username = event.srcElement.username
        const password = event.srcElement.password

        fetch(apiUrl,{
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "grant_type=password&username="+username+"&password="+password
        }
        ).then(function(response){
            return response.json()
        }).catch(function(error){
            console.log(error)
        })
        .then(function(body){
            login(body.access_token)
        }).catch(function(error){
            console.log(error)
        })
    })
}

function login(accessToken){
    localStorage.accessToken = accessToken
    document.body.classList.remove("isLoggedOut")
    document.body.classList.add("isLoggedIn")
}