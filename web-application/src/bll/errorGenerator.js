module.exports = function ({}) { 
    return {
        getInternalError: function(error) {
            console.log(`%c ${error}`, "color:red")
            return {code: 500, messages:["Internal error"]}
        },
        getClientError: function(errorArray) {
            let messageArray = []
            
            if (Array.isArray(errorArray) == false) {
                messageArray.push(errorArray)
            }
            else {
                messageArray = errorArray
            }
            
            return {code: 400, messages:messageArray}
        }
    }
}