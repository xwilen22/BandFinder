function displayEditPageForUser(parentElement, username) {
    const usernameHeader = parentElement.getElementsByTagName("h2")[0]

    const biographyEditForm = document.getElementById("bioEditForm")
    const biographyTextarea = biographyEditForm.getElementsByTagName("textarea")[0]
    
    const instrumentsSelect = document.getElementById("instrumentSelect")
  
    const proficienciesUnorderedList = parentElement.getElementsByTagName("ul")[0]
    const proficiencyListItemTemplate = document.getElementById("proficiencyItem")

    fetchResource(`account/${username}`, function(error, accountInformationObject) {
        if(error) {

        }
        else {
            usernameHeader.innerText = accountInformationObject.username
            biographyTextarea.innerText = accountInformationObject.biography

            biographyEditForm.addEventListener("submit", function(event) {
                event.preventDefault()

            })
        }
    })

    instrumentsSelect.innerHTML = ""
    fetchResource("instruments" ,function(error, instruments) {
        if(error) {

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
                
                //When user wants to update prof level
                updateForm.addEventListener("submit", function(event) {

                })

                const deleteForm = proficiencyListItem.getElementsByTagName("form")[1]
                //When user wants to delete prof
                deleteForm.addEventListener("submit", function(event) {

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