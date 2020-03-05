module.exports = function ({}) { 
    return {
        getInternalError: function(error) {
            console.error(error)
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
        },
        getSuccess: function() {
            return undefined
        }
    }
}