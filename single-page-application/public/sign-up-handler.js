function signUpNewAccount(){
    const apiUrl = "http://192.168.99.100:8080/api/tokens"
    const signUpForm = document.querySelector("#signup")
    signUpForm.addEventListener("submit", function(event){
        
        const username = event.srcElement.elements[0].value
        const password = event.srcElement.elements[1].value

        const account = {
            username,
            password
        }

        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer"+localStorage.accessToken
            },
            body: JSON.stringify(account)
        }).then(function(response){
            console.log(response)
        }).catch(function(error){
            console.log(error)
        })
    })
}