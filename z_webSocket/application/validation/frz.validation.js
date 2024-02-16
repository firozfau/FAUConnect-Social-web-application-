
 const emailValidator = require('email-validator');

class FRZ {


    static  isValidEmail(filedString) {
  
        if(emailValidator.validate(filedString))
        {
 
            return true 
        }
        else {
            return false;
        }
    }
     


}



module.exports = FRZ;