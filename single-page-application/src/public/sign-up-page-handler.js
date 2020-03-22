
function displaySignUpNewAccountPage(){

    const signUpForm = document.querySelector("#signup")
    const alertHolder = document.getElementById("alert-holder")
    signUpForm.addEventListener("submit", function(event){
        event.preventDefault()
        const username = event.srcElement.elements[0].value
        const password = event.srcElement.elements[1].value
        
        signUpAccount(username,password,function(error, createdUsername){
            if(error){
                alertHolder.appendChild(getAlert("Failed to create account", "danger"))
            }
            else{
                signIn(createdUsername, password, function(error, username) {
                    if(error) {
                        alertHolder.appendChild(getAlert("Failed to sign in","danger"))
                        signOut()
                    }
                    else {
                        UiSignedInHelp(username)
                        moveTo(`/account/view/${username}`)
                    }
                })
            }
        })
    })
    setLoadingPage(false)
}
function signUpAccount(username, password, callback){
    fetch(`${currentDomain}/api/account`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `username=${username}&password=${password}`
    })
    .then(response => {
        if(response.status == 201){
            response.json()
            .then(createdUsername => {
                callback(undefined,createdUsername)
            })
            .catch(error => {
                callback(error,undefined)
            })
        }
        else {
            callback(["Unexpected result"])
        }
    })
}