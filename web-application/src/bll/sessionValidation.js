const express = require("express")
const expressSessions = require("express-session")

modules.exports = {
    validateAccountnameInSession: function(accountname){
        //callback(error, sessionId)
        if(accountname == sessionId){
            return true
        }
        else{
            return false
        }
    }
}