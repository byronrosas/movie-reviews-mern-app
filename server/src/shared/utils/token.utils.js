import Jwt from "jsonwebtoken"

async function signToken(userId){ 
    // token options   
    const options = {
        expiresIn:"24h",
        issuer:process.env.DOMAIN,
        audience:userId.toString()
    }

    const payload = {};

    // sign token with payload and options
    const token = await Jwt.sign(payload,process.env.SECRET_TOKEN,options);     

    return token;
}

async function verifyToken(token){

    // verify token
    const decoded = await Jwt.verify(token,process.env.SECRET_TOKEN);       

    return decoded;
}

export {
    signToken,
    verifyToken    
}