const connectRedi = require("connect-redis")
const bcrypt = require("bcrypt")
const userValidation = require("userValidation")
const HASH_SALT_ROUNDS = 10

function signUpAccount(accountName, password, callback){
   if(userValidation.accountNameValidation == true){
       if(userValidation.passwordValidation == true){
           let hash = bcrypt.hash(password, HASH_SALT_ROUNDS)
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
    if(sessionValidation.validateAccountnameInSession == true){
        //callback(id)
    }
    else{
        //callback(errorUnauthorized)
    }
}

function deleteAccount(accountName, password, callback){
    if(sessionValidation.validateAccountnameInSession == true){
        //callback(error, accountName)
    }
    else{
        //callback(errorUnauthorized)
    }
}