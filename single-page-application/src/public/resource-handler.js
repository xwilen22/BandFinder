function fetchResource(resourceUri, callback) {
    fetch(
        `${currentDomain}/api/${resourceUri}`
    )
    .catch(timeoutError => {
        console.log(timeoutError)
        if(response.status == undefined) {
            console.log("GOTTEM ", timeoutError)
            callback({status: 400, message: "Timed out"})
        }
    })
    .then(response => {
        if(response.status == 200) {
            response.json()    
            .then(fetchedResource => {
                callback(undefined, fetchedResource)
            })
            .catch(error => {
                callback({status: 400, error})
            })
        }
        else {
            callback(response)
        }
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
            callback(response)
        }
    })
    .catch(error => {
        callback({status: 400, error})
    })
}

function deleteResourceAuth(resourceUri, callback) {
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
            callback(response)
        }
    })
    .catch(error => {
        callback({status: 400, error})
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
            callback(response)
        }
    })
    .catch(error => {
        callback({status: 400, error})
    })
}