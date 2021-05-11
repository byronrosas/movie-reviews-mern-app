import createError from 'http-errors';
import UserRepository from '../repositories/user.repository';
import { verifyToken } from '../utils/token.utils';
 const userRepository = new UserRepository();
// verify if user is logged in
async function isAuth(req,res,next){    
    // verify if header authorization exists
    if(!req.headers['authorization']) return next(createError.Unauthorized());

    // get all header authorization string
    const authHeader = req.headers["authorization"];    
    // divide string [bearer,token]
    const bearerToken = authHeader.split(" ");
    // get only token
    const token = bearerToken[1];

    // verify if token exists
    if (!token) return next(createError.Unauthorized("No token provided"));

    try {
        // decoded token
        const tokenDecoded = await verifyToken(token);
        console.log(tokenDecoded);
        const idUser = tokenDecoded.aud;
        // verify user exists
        const user = await userRepository.getById(idUser);
        if (!user) throw createError.NotFound('User not found');
        console.log("user auth=>",user);        

        req.userId = idUser;        

        next();
        
    } catch (error) {
        console.log(error);
        if(error.name === 'JsonWebTokenError'){
            return next(createError.Unauthorized());
        }
        else{
            return next(createError.Unauthorized(error.message)); 
        }
    }


}


export {
    isAuth
}