
import Joi from '@hapi/joi';

const userValidation = Joi.object({	
	firstname:Joi.string().min(1).max(150).required(),
	lastname:Joi.string().min(1).max(150).required(),
	email:Joi.string().email().lowercase().required(),
    password:Joi.string().min(6).max(100).required()

});

const authValidation = Joi.object({		
	email:Joi.string().email().lowercase().required(),
    password:Joi.string().min(6).max(100).required()

});

export {
    userValidation,
    authValidation
}