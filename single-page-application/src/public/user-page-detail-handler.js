function displayUserDetailPageForUsername(parentElement, username) {
    const usernameHeader = parentElement.getElementsByTagName("h2")[0]
    const bioparagraphElement = parentElement.getElementsByTagName("p")[0]
    const editUserAnchor = parentElement.getElementsByTagName("a")[0]
    const errorPage = document.getElementById("error-page")

    const requestedUsername = decodeURIComponent(username)

    editUserAnchor.hidden = (requestedUsername != localStorage.username)

    fetchResource(`account/${requestedUsername}`, function(error, accountInformationObject) {
        if(error) {
            console.log(error)
            errorPage.appendChild(getErrorPage("Couldn't fetch the user, sorry about that!", error.status))
        }
        else {
            usernameHeader.innerText = accountInformationObject.username
            if (accountInformationObject.biography != undefined || accountInformationObject.biography != null) {
                bioparagraphElement.innerText = accountInformationObject.biography
            }
            else {
                bioparagraphElement.innerText = "This user has no biography."
            }
            editUserAnchor.href = `/account/edit/${accountInformationObject.username}`
        }
        setLoadingPage(false)
    })
    fetchResource(`proficiencies/${requestedUsername}`, function(error, proficiencies) {
        if(error) {
            console.log(error)
            document.getElementById("alert-holder").appendChild(getAlert("Failed to fetch proficiencies!", "danger"))
        }
        else {
            const proficiencyList = document.getElementById("view-proficiency-ul")

            //Appends proficiencies by template
            if(proficiencies.length > 0) {
                proficiencyList.hidden = false

                const proficiencyListElementTemplate = document.getElementsByClassName("viewProficiencyItem")[0]
                proficiencyListElementTemplate.hidden = true
                
                for(proficiency of proficiencies) {
                    const proficiencyListItem = proficiencyListElementTemplate.cloneNode(true)
                    const proficiencyContentParagraph = document.createElement("p")

                    proficiencyListItem.hidden = false

                    proficiencyContentParagraph.innerText = `${proficiency.instrument_name} ${proficiency.proficiency_level}`
                    proficiencyListItem.appendChild(proficiencyContentParagraph)

                    proficiencyList.appendChild(proficiencyListItem)
                }

                document.getElementById("view-proficiency-if-empty").hidden = true
            }
            else {
                proficiencyList.hidden = true
                document.getElementById("view-proficiency-if-empty").hidden = false
            }
            console.log(proficiencies)
        }
        setLoadingPage(false)
    })
}

