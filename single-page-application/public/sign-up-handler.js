function signUpNewAccount(){
    const apiUrl = {
        localhost: "http://localhost:8080/api/account/tokens",
        dockerIp: "http://192.168.99.100:8080/api/account/tokens"
    }
    const signUpForm = document.querySelector("#signup")
    signUpForm.addEventListener("submit", function(event){
        event.preventDefault()
        const username = event.srcElement.elements[0].value
        const password = event.srcElement.elements[1].value

        const account = {
            username,
            password
        }

        console.log("Request body: ", JSON.stringify(account))

        fetch(apiUrl.localhost, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"/*,
                "Authorization": "Bearer "+localStorage.accessToken*/
            },
            body: `username=${username}&password=${password}`
        })
        .then(response => {
            return response.json()
        })
        .then(createdUsername => {
            console.log(createdUsername)
            login()
            moveToPage(`account/view/${createdUsername}`)
        })
        .catch(error => {
            console.log(error)
        })
    })
}