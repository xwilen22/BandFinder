function  getAlert(message, type){
    let alertDiv = document.createElement("div")
    let roleAttribute = document.createAttribute("role")
    roleAttribute.value="alert"
    alertDiv.className = `alert alert-${type}`
    alertDiv.setAttributeNode(roleAttribute)
    alertDiv.innerText = message
    return alertDiv
}
function getErrorPage(message, errorCode){
    let errorDiv = document.createElement("div")
    let errorHeader = document.createElement("h2")
    let errorParagraph = document.createElement("p")
    errorHeader.innerText = `That's an ${errorCode} Error`
    errorParagraph.innerText = message
    console.log("header is: ",errorHeader)
    errorDiv.appendChild(errorHeader)
    errorDiv.appendChild(errorParagraph)
    return errorDiv
}