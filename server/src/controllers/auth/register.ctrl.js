import createError from "http-errors";
import { userModel } from "../../models";
import { userValidation } from "../../models/validation/user.validation";

import { signToken } from "../../shared/utils/token.utils";

// login controller
function RegisterCtrl(userPersistence){ 
    
    // validate fields
    async function isValid(body) {
        const result = await userValidation.validateAsync(body);
        return result;
    }

    return async (req,res,next)=>{
        try {
            // validate
            const valuesResult = await isValid(req.body);                
            
            // save
            const user = await userPersistence.save(valuesResult);                                                 
            
            // generate token            
            const token = await signToken(user._id);

            res.json({token:token,fistname:user.firstname,lastname:user.lastname});

        } catch (error) {
            console.log(error.message);
            if (error.isJoi === true) error.status = 422;
            next(error);
        }
    }
}

export default RegisterCtrl;