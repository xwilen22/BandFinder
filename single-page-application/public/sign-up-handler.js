function signUpNewAccount(){
    const apiUrl = {
        localhost: "http://localhost:8080/api/account",
        dockerIp: "http://192.168.99.100:8080/api/account"
    }
    const signUpForm = document.querySelector("#signup")
    signUpForm.addEventListener("submit", function(event){
        event.preventDefault()
        
        const username = event.srcElement.elements[0].value
        const password = event.srcElement.elements[1].value

        fetch(apiUrl.dockerIp, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `username=${username}&password=${password}`
        })
        .then(response => {
            return response.json()
        })
        .then(createdUsername => {
            console.log(createdUsername)
            login(createdUsername, password, function(error, username) {
                if(error) {
                    console.log(error)
                }
                else {
                    moveToPage(`account/view/${username}`)
                }
            })
        })
        .catch(error => {
            console.log(error)
        })
    })
}