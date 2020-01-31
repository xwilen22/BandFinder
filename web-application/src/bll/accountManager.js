const express = require("express")
const expressSessions = require("express-session")
const connectRedi = require("connect-redis")
const bcrypt = require("bcrypt")
const userValidation = require("userValidation")
const HASHSALTROUNDS = 10

function signUpAccount(accountName, password, callback){
   if(userValidation.accountNameValidation == true){
       if(userValidation.passwordValidation == true){
           let hash = bcrypt.hash(password, HASHSALTROUNDS)
           //callback(error, id)
       }
       else{
           //callback(errorPassword)
       }
   }
   else{
       //callback(errorAccountname)
   }
}

function signInAccount(accountName, password, callback){
    
    //callback(error, id, hashValue)

    if(accountName == retrivedAccountName){
        if(bcrypt.compare(password, hashValue) == true){
            //callback(id)
        }
        else{
            //callback(errorPassword)
        }
    }
    else{
        //callback(errorAccountName)
    }
}

function updateAccount(accountName,password, callback){
    //callback(error, session)
    if(accountName == sessionSignedInAccount){
        //callback(id)
    }
    else{
        //callback(errorUnauthorized)
    }
}

function deleteAccount(accountName, password, callback){
    //callback(error, session)
    if(accountName == sessionSignedInAccount){
        //callback(error, accountName)
    }
    else{
        //callback(errorUnauthorized)
    }
}