function  getAlert(message, type){
    let alertDiv = document.createElement("div")
    
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`

    alertDiv.setAttribute("role", "alert")
    alertDiv.innerText = message

    let dismissButton = document.createElement("button")
    dismissButton.type = "button"
    dismissButton.className = "close"

    dismissButton.setAttribute("data-dismiss", "alert")
    dismissButton.setAttribute("aria-label", "Close")

    let timesSpan = document.createElement("span")
    timesSpan.setAttribute("aria-hidden", "true")
    timesSpan.innerHTML = "&times;"

    dismissButton.appendChild(timesSpan)
    alertDiv.appendChild(dismissButton)

    return alertDiv
}

function getErrorPage(message, errorCode){
    let errorDiv = document.createElement("div")
    let errorHeader = document.createElement("h2")
    let errorParagraph = document.createElement("p")
    
    errorHeader.innerText = `That's a ${errorCode} Error`
    errorParagraph.innerText = message
    
    errorDiv.appendChild(errorHeader)
    errorDiv.appendChild(errorParagraph)
    
    return errorDiv
}

function setLoadingPage(activate) {
    document.getElementById("loading-indicator-page").style.opacity = (activate ? 1 : 0)
}