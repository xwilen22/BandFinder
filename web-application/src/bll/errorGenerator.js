module.exports = function ({}) { 
    return {
        errorType: {
            WARNING: "warning",
            DANGER: "danger",
            SUCCESS: "success"
        },
        getInternalError: function(error) {
            console.error("ERRORGENERATOR FETCHED ERROR: ", error)
            return {code: 500, 
                messages:["Internal error"],
                type: this.errorType.WARNING,
                retainPage: false
            }
        },
        getClientError: function(errorArray, httpCodeOverride) {
            let messageArray = []
            let retrievedHttpCode

            if (Array.isArray(errorArray) == false) {
                console.warn("ERRORGENERATOR Potential missuse of getClientError (not an array): ", errorArray)
                messageArray.push(errorArray)
            }
            else {
                messageArray = errorArray
            }

            if ((httpCodeOverride == null || httpCodeOverride == undefined) && isNaN(httpCodeOverride) == true) {
                retrievedHttpCode = 400
            }
            else {
                retrievedHttpCode = httpCodeOverride
            }


            return {code: retrievedHttpCode, 
                messages:messageArray,
                type: this.errorType.DANGER,
                retainPage: true
            }
        },
        getHttpCodeError: function(httpResponseCode) {
            let retrievedHttpCode
            
            if ((httpResponseCode == null || httpResponseCode == undefined) && isNaN(httpResponseCode) == true) {
                console.warn("ERRORGENERATOR Missuse of getHttpCodeError, responseCode is either undefined/null or not a number")
                retrievedHttpCode = 500
            }
            else {
                retrievedHttpCode = httpResponseCode
            }

            return {code: retrievedHttpCode, 
                messages:[],
                type: this.errorType.DANGER,
                retainPage: false
            }
        },
        getSuccess: function() {
            return undefined
        }
    }
}