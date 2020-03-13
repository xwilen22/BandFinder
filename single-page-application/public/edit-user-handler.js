function displayEditPageForUser(parentElement, username) {
    const usernameHeader = parentElement.getElementsByTagName("h2")[0]

    const biographyEditForm = document.getElementById("bioEditForm")
    const biographyTextarea = biographyEditForm.getElementsByTagName("textarea")[0]
    
    const proficiencyAddForm = document.getElementById("proficiencyAddForm")
    const instrumentsSelect = proficiencyAddForm.getElementsByTagName("select")[0]
    const addProficiencyLevelNumberInput = document.getElementById("skillLevelNumber")

    const proficiencyListItemTemplate = document.getElementById("proficiencyItem")

    proficiencyAddForm.addEventListener("submit", function(event) {
        event.preventDefault()
        addResourceAuth(`proficiencies`, {instrumentName: instrumentsSelect.value, skillLevelNumber:addProficiencyLevelNumberInput.value, username}, function(error) {
            if(error) {
                console.log("bad", error)
            }
            else {
                const proficiency = {
                    instrument_name: instrumentsSelect.value,
                    proficiency_level: addProficiencyLevelNumberInput.value
                }
                addProficiencyToList(proficiency, proficiencyListItemTemplate, username)
            }
        })
    })

    fetchResource(`account/${username}`, function(error, accountInformationObject) {
        if(error) {
            console.log("Bolloxed", error)
        }
        else {
            usernameHeader.innerText = accountInformationObject.username
            biographyTextarea.innerText = accountInformationObject.biography

            biographyEditForm.addEventListener("submit", function(event) {
                event.preventDefault()
                updateResourceAuth(`account/${username}`, {biography:biographyTextarea.value}, function(error) {
                    if(error) {
                        console.error("no", error)
                    }
                    else {
                        console.log("ye")
                    }
                })
            })
        }
    })

    instrumentsSelect.innerHTML = ""
    fetchResource("instruments" ,function(error, instruments) {
        if(error) {
            console.log("Bolloxed", error)
        }
        else {
            for (instrument of instruments) {
                const instrumentOption = document.createElement("option")
                instrumentOption.innerText = instrument.instrument_name
                instrumentsSelect.appendChild(instrumentOption)
            }
        }
    })
    fetchResource(`proficiencies/${username}`, function(error, proficiencies) {
        if(error) {
            console.error(error)
        }
        else {
            const proficienciesUnorderedList = parentElement.getElementsByTagName("ul")[0]
            proficienciesUnorderedList.innerHTML = ""
            
            for (proficiency of proficiencies) {
                addProficiencyToList(proficiency, proficiencyListItemTemplate, proficienciesUnorderedList, username)
            }
            proficiencyListItemTemplate.hidden = true
        }
    })
}
function addProficiencyToList(proficiencyObject, templateElement, username) {
    const proficienciesUnorderedList = document.getElementById("edit-proficiency-ul")
    const proficiencyListItem = templateElement.cloneNode(true)

    proficiencyListItem.getElementsByTagName("p")[0].innerText = proficiencyObject.instrument_name

    const updateForm = proficiencyListItem.getElementsByTagName("form")[0]
    updateForm.getElementsByTagName("input")[0].value = proficiencyObject.proficiency_level

    const instrumentName = proficiencyObject.instrument_name

    //When user wants to update prof level
    updateForm.addEventListener("submit", function (event) {
        event.preventDefault()
        const proficiencyLevel = updateForm.getElementsByTagName("input")[0].value
        updateResourceAuth(`proficiencies/${username}/${instrumentName}`, { skillLevelNumber: proficiencyLevel }, function (error) {
            if (error) {
                console.log("bad", error)
            }
            else {
                console.log("Good")
            }
        })
    })

    const deleteForm = proficiencyListItem.getElementsByTagName("form")[1]
    //When user wants to delete prof
    deleteForm.addEventListener("submit", function (event) {
        event.preventDefault()
        deleteResourceAuth(`proficiencies/${username}/${instrumentName}`, function (error) {
            if (error) {
                console.log("bad", error)
            }
            else {
                proficienciesUnorderedList.removeChild(proficiencyListItem)
            }
        })
    })
    proficiencyListItem.hidden = false
    proficienciesUnorderedList.appendChild(proficiencyListItem)

}


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