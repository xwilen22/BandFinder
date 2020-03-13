function  getAlert(message, type){
    let alertDiv = document.createElement("div")
    let roleAttribute = document.createAttribute("role")
    roleAttribute.value="alert"
    alertDiv.className = `alert alert-${type}`
    alertDiv.setAttributeNode(roleAttribute)
    alertDiv.innerText = message
    return alertDiv
}