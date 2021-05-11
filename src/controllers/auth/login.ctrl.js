import createError from "http-errors";
import { userModel } from "../../models";
import { authValidation } from "../../models/validation/user.validation";

import { signToken } from "../../shared/utils/token.utils";

// login controller
function LoginCtrl(userPersistence){ 
    
    // validate fields

    async function isValid(body) {
        const result = await authValidation.validateAsync(body);
        return result;
    }

    return async (req,res,next)=>{
        try {
            // validate
            const valuesResult = await isValid(req.body);
        
            const { email, password} = valuesResult;            
            
            // query user by email
            const user = await userPersistence.getByEmail(email);

            // verify if user exists
            if(!user) throw createError.NotFound("User by email not found");
                        
            // compare password 
            const matchPass = await userModel.compareData(
                password,
                user.password
            );
                       
            if(!matchPass) throw createError.NotFound("Password and email do not correct");
            
            // generate token            
            const token = await signToken(user._id);

            res.json({_id:user._id,token:token,firstname:user.firstname,lastname:user.lastname});

        } catch (error) {
            console.log(error.message);
            if (error.isJoi === true) error.status = 422;
            next(error);
        }
    }
}

export default LoginCtrl;