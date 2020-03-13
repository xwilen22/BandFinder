function fetchResource(resourceUri, callback) {
    fetch(
        `${currentDomain}/api/${resourceUri}`
    )
    .then(response => {
        if(response.status == 200) {
            return(response.json())
        }
        else {
            callback(["Unexpected result"])
        }
    })
    .then(instruments => {
        callback(undefined, instruments)
    })
    .catch(error => {
        callback(error)
    })
}

function updateResourceAuth(resourceUri, keyValueBodyObject, callback) {
    let body = ""
    for(key in keyValueBodyObject) {
        if(body.length > 0) {
            body += "&"
        }
        body += `${key}=${keyValueBodyObject[key]}`
    }

    fetch(
        `${currentDomain}/api/${resourceUri}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "authorization": `Bearer ${localStorage.accessToken}`
            },
            body
        }
    )
    .then(response => {
        if(response.status == 204) {
            callback(undefined)
        }
        else {
            console.log("Error ", response)
            callback(["Unexpected result"])
        }
    })
    .catch(error => {
        console.log("Error ", error)
        callback(error)
    })
}

function deleteResourceAuth(resourceUri, callback) {
    console.log("Tried?")
    fetch(
        `${currentDomain}/api/${resourceUri}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "authorization": `Bearer ${localStorage.accessToken}`
            },
        }
    )
    .then(response => {
        if(response.status == 204) {
            callback(undefined)
        }
        else {
            console.log("Error ", response)
            callback(["Unexpected result"])
        }
    })
    .catch(error => {
        console.log("Error ", error)
        callback(error)
    })
}

function addResourceAuth(resourceUri, keyValueBodyObject, callback) {
    let body = ""
    for(key in keyValueBodyObject) {
        if(body.length > 0) {
            body += "&"
        }
        body += `${key}=${keyValueBodyObject[key]}`
    }

    fetch(
        `${currentDomain}/api/${resourceUri}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "authorization": `Bearer ${localStorage.accessToken}`
            },
            body
        }
    )
    .then(response => {
        if(response.status == 201) {
            callback(undefined)
        }
        else {
            console.log("Error ", response)
            callback(["Unexpected result"])
        }
    })
    .catch(error => {
        console.log("Error ", error)
        callback(error)
    })
}