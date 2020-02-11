module.exports = function ({}) { 
    return {
        getInternalError: function(error) {
            console.log(error)
            return ["Internal error"]
        }
    }
}