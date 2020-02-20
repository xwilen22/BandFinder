module.exports = function ({}) { 
    return {
        getInternalError: function(error) {
            console.log(`%c ${error}`, "color:red")
            return ["Internal error"]
        }
    }
}