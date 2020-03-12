function displayEditPageForUser(parentElement, username) {
    const usernameHeader = parentElement.getElementsByTagName("h2")[0]

    const biographyEditForm = document.getElementById("bioEditForm")
    const biographyTextarea = biographyEditForm.getElementsByTagName("textarea")[0]
    
    const instrumentsSelect = document.getElementById("instrumentSelect")
  
    const proficienciesUnorderedList = parentElement.getElementsByTagName("ul")[0]
    const proficiencyListItemTemplate = document.getElementById("proficiencyItem")

    fetchResource(`account/${username}`, function(error, accountInformationObject) {
        if(error) {
            console.log("Bolloxed", error)
        }
        else {
            usernameHeader.innerText = accountInformationObject.username
            biographyTextarea.innerText = accountInformationObject.biography

            biographyEditForm.addEventListener("submit", function(event) {
                event.preventDefault()
                editBiographyForUsername(accountInformationObject.username, biographyTextarea.value, function(error) {
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
            for (proficiency of proficiencies) {
                console.log(proficiency)
                const proficiencyListItem = proficiencyListItemTemplate.cloneNode(true)
                proficiencyListItem.getElementsByTagName("p")[0].innerText = proficiency.instrument_name
                
                const updateForm = proficiencyListItem.getElementsByTagName("form")[0]
                updateForm.getElementsByTagName("input")[0].value = proficiency.proficiency_level
                
                const instrumentName = proficiency.instrument_name

                //When user wants to update prof level
                updateForm.addEventListener("submit", function(event) {
                    event.preventDefault()
                    const proficiencyLevel = updateForm.getElementsByTagName("input")[0].value

                    updateResourceAuth(`proficiencies/${username}/${instrumentName}`, {skillLevel:proficiencyLevel}, function(error) {
                        if(error) {
                            console.log("bad", error)
                        }
                        else {
                            console.log("Good")
                        }
                    })
                    /*editProficiencyLevelForUsernameAndInstrument(username, proficiency.instrument_name, proficiencyLevel, function(error) {
                        if(error) {
                            console.log("Error", error)
                        }
                        else {
                            console.log("Nice")
                        }
                    })*/
                })

                const deleteForm = proficiencyListItem.getElementsByTagName("form")[1]
                //When user wants to delete prof
                deleteForm.addEventListener("submit", function(event) {
                    event.preventDefault()
                    updateResourceAuth("", {skillLevel:1, kuken:"hej"})
                })

                proficienciesUnorderedList.appendChild(proficiencyListItem)
            }
            proficiencyListItemTemplate.hidden = true
        }
    })
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
        console.log("FETCHED STUFF", instruments)
        callback(undefined, instruments)
    })
    .catch(error => {
        console.log("FAILED", error)
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
function editBiographyForUsername(username, biographyText, callback) {
    fetch(
        `${currentDomain}/api/account/${username}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "authorization": `Bearer ${localStorage.accessToken}`
            },
            body: `biography=${biographyText}`
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
function editProficiencyLevelForUsernameAndInstrument(username, instrumentName, proficiencyLevel, callback) {
    fetch(
        `${currentDomain}/api/proficiencies/${username}/${instrumentName}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "authorization": `Bearer ${localStorage.accessToken}`
            },
            body: `skillLevel=${proficiencyLevel}`
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
function deleteProficiencyForUsernameAndInstrument(username, instrumentName, callback) {

}
function addProficiencyForUsername(username, instrumentName, proficiencyLevel, callback) {

}