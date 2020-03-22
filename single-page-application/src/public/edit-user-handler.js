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
        setLoadingPage(true)
        addResourceAuth(`proficiencies`, {instrumentName: instrumentsSelect.value, skillLevelNumber:addProficiencyLevelNumberInput.value, username}, function(error) {
            if(error) {
                document.getElementById("alert-holder").innerHTML = ""
                document.getElementById("alert-holder").appendChild(getAlert("Failed to add proficiency!", "danger"))
            }
            else {
                const proficiency = {
                    instrument_name: instrumentsSelect.value,
                    proficiency_level: addProficiencyLevelNumberInput.value
                }
                addProficiencyToList(proficiency, proficiencyListItemTemplate, username)

                document.getElementById("alert-holder").appendChild(getAlert("Proficiency added", "success"))
            }
            setLoadingPage(false)
        })
    })

    fetchResource(`account/${username}`, function(error, accountInformationObject) {
        if(error) {
            document.getElementById("alert-holder").appendChild(getAlert("Failed to fetch biography!", "danger"))
        }
        else {
            usernameHeader.innerText = accountInformationObject.username
            biographyTextarea.innerText = accountInformationObject.biography

            biographyEditForm.addEventListener("submit", function(event) {
                event.preventDefault()
                updateResourceAuth(`account/${username}`, {biography:biographyTextarea.value}, function(error) {
                    if(error) {
                        document.getElementById("alert-holder").innerHTML = ""
                        document.getElementById("alert-holder").appendChild(getAlert("Failed to update biography!", "danger"))
                    }
                    else {
                        document.getElementById("alert-holder").appendChild(getAlert("Biography updated", "success"))
                    }
                })
            })
        }
        setLoadingPage(false)
    })

    instrumentsSelect.innerHTML = ""
    fetchResource("instruments" ,function(error, instruments) {
        if(error) {
            document.getElementById("alert-holder").appendChild(getAlert("Failed to fetch instruments!", "danger"))
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
            document.getElementById("alert-holder").innerHTML = ""
            document.getElementById("alert-holder").appendChild(getAlert("Failed to fetch proficiencies!", "danger"))
        }
        else {
            const proficienciesUnorderedList = parentElement.getElementsByTagName("ul")[0]
            proficienciesUnorderedList.innerHTML = ""
            
            for (proficiency of proficiencies) {
                addProficiencyToList(proficiency, proficiencyListItemTemplate, username)
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
                document.getElementById("alert-holder").appendChild(getAlert("Failed to update proficiency!", "danger"))
            }
            else {
                document.getElementById("alert-holder").appendChild(getAlert("Proficiency updated", "success"))
            }
        })
    })

    const deleteForm = proficiencyListItem.getElementsByTagName("form")[1]
    //When user wants to delete prof
    deleteForm.addEventListener("submit", function (event) {
        event.preventDefault()
        deleteResourceAuth(`proficiencies/${username}/${instrumentName}`, function (error) {
            if (error) {
                document.getElementById("alert-holder").appendChild(getAlert("Failed to delete proficiency!", "danger"))
            }
            else {
                proficienciesUnorderedList.removeChild(proficiencyListItem)
                document.getElementById("alert-holder").appendChild(getAlert("Proficiency deleted", "success"))
            }
        })
    })
    proficiencyListItem.hidden = false
    proficienciesUnorderedList.appendChild(proficiencyListItem)
}